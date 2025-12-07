#!/usr/bin/env python3
"""
Enhanced PDF Management System Backend API
Advanced Flask-based API for PDF manipulation with page-level operations.
"""

import os
import sys
import uuid
import shutil
import base64
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any, Optional

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Add scripts directory to Python path
sys.path.append(str(Path(__file__).parent.parent / 'scripts'))
from pdf_tools import PDFTools

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://localhost:5173'])

# Configuration
UPLOAD_FOLDER = Path(__file__).parent / 'uploads'
TEMP_FOLDER = Path(__file__).parent / 'temp'
PREVIEW_FOLDER = Path(__file__).parent / 'previews'
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB max file size
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure directories exist
UPLOAD_FOLDER.mkdir(exist_ok=True)
TEMP_FOLDER.mkdir(exist_ok=True)
PREVIEW_FOLDER.mkdir(exist_ok=True)

app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TEMP_FOLDER'] = TEMP_FOLDER
app.config['PREVIEW_FOLDER'] = PREVIEW_FOLDER


def allowed_file(filename: str) -> bool:
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_pdf_preview(pdf_path: Path, page_num: int = 0, dpi: int = 150) -> Optional[str]:
    """
    Generate a preview image for a specific page of a PDF.
    
    Args:
        pdf_path: Path to the PDF file
        page_num: Page number (0-indexed)
        dpi: Resolution for the preview
        
    Returns:
        Base64 encoded image string or None if failed
    """
    try:
        import fitz  # PyMuPDF
        import io
        from PIL import Image
        
        # Open the PDF
        doc = fitz.open(str(pdf_path))
        
        if page_num >= doc.page_count:
            return None
            
        # Get the page
        page = doc.load_page(page_num)
        
        # Render page to pixmap
        mat = fitz.Matrix(dpi/72, dpi/72)  # Scale factor for DPI
        pix = page.get_pixmap(matrix=mat)
        
        # Convert to PIL Image
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        
        # Convert to base64
        buffer = io.BytesIO()
        img.save(buffer, format='PNG', quality=85, optimize=True)
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        doc.close()
        return f"data:image/png;base64,{img_str}"
        
    except Exception as e:
        print(f"Preview generation error: {e}")
        return None


def extract_pdf_pages(pdf_path: Path, page_indices: List[int]) -> List[Path]:
    """
    Extract specific pages from a PDF and save them as individual files.
    
    Args:
        pdf_path: Path to the source PDF
        page_indices: List of page indices to extract (0-indexed)
        
    Returns:
        List of paths to extracted page files
    """
    try:
        import fitz  # PyMuPDF
        
        extracted_files = []
        doc = fitz.open(str(pdf_path))
        
        # Validate page indices
        valid_indices = [i for i in page_indices if 0 <= i < doc.page_count]
        
        if not valid_indices:
            doc.close()
            return []
        
        for i, page_index in enumerate(valid_indices):
            # Create new PDF with single page
            new_doc = fitz.open()
            new_doc.insert_pdf(doc, from_page=page_index, to_page=page_index)
            
            # Save the extracted page
            output_filename = f"page_{page_index + 1}_{uuid.uuid4()}.pdf"
            output_path = TEMP_FOLDER / output_filename
            new_doc.save(str(output_path))
            new_doc.close()
            
            extracted_files.append(output_path)
        
        doc.close()
        return extracted_files
        
    except Exception as e:
        print(f"Page extraction error: {e}")
        return []


def cleanup_old_files(directory: Path, max_age_hours: int = 24):
    """Clean up files older than specified hours."""
    try:
        current_time = datetime.now()
        for file_path in directory.iterdir():
            if file_path.is_file():
                file_age = current_time - datetime.fromtimestamp(file_path.stat().st_mtime)
                if file_age.total_seconds() > max_age_hours * 3600:
                    file_path.unlink()
                    print(f"Cleaned up old file: {file_path}")
    except Exception as e:
        print(f"Cleanup error: {e}")


def generate_pdf_preview(pdf_path: Path, page_num: int = 0, size: tuple = (200, 283)) -> Optional[str]:
    """
    Generate a base64 encoded preview image of a PDF page.
    
    Args:
        pdf_path: Path to PDF file
        page_num: Page number to preview (0-indexed)
        size: Preview image size (width, height)
        
    Returns:
        Base64 encoded image string or None if failed
    """
    try:
        import fitz  # PyMuPDF
        
        doc = fitz.open(pdf_path)
        if page_num >= len(doc):
            return None
            
        page = doc.load_page(page_num)
        
        # Render page to pixmap
        mat = fitz.Matrix(size[0]/page.rect.width, size[1]/page.rect.height)
        pix = page.get_pixmap(matrix=mat)
        
        # Convert to base64
        img_data = pix.tobytes("png")
        base64_string = base64.b64encode(img_data).decode('utf-8')
        
        doc.close()
        return f"data:image/png;base64,{base64_string}"
        
    except ImportError:
        print("PyMuPDF not available - install with: pip install PyMuPDF")
        return None
    except Exception as e:
        print(f"Preview generation error: {e}")
        return None


def extract_pdf_pages(pdf_path: Path, pages: List[int]) -> List[Path]:
    """
    Extract specific pages from a PDF.
    
    Args:
        pdf_path: Path to source PDF
        pages: List of page numbers to extract (0-indexed)
        
    Returns:
        List of paths to extracted page PDFs
    """
    try:
        from PyPDF2 import PdfReader, PdfWriter
        
        reader = PdfReader(pdf_path)
        extracted_files = []
        
        for i, page_num in enumerate(pages):
            if page_num >= len(reader.pages):
                continue
                
            writer = PdfWriter()
            writer.add_page(reader.pages[page_num])
            
            output_path = TEMP_FOLDER / f"{pdf_path.stem}_page_{page_num + 1}.pdf"
            with open(output_path, 'wb') as output_file:
                writer.write(output_file)
            
            extracted_files.append(output_path)
        
        return extracted_files
        
    except Exception as e:
        print(f"Page extraction error: {e}")
        return []


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0'
    })


@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    """
    Upload and analyze a PDF file with page previews.
    
    Returns:
        - PDF information and page previews
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if not file or file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        temp_path = TEMP_FOLDER / f"{uuid.uuid4()}_{filename}"
        file.save(temp_path)
        
        # Validate PDF
        if not PDFTools.validate_pdf(temp_path):
            temp_path.unlink()
            return jsonify({'error': 'Invalid PDF file'}), 400
        
        # Get PDF info
        info = PDFTools.get_pdf_info(temp_path)
        if not info:
            temp_path.unlink()
            return jsonify({'error': 'Failed to analyze PDF'}), 500
        
        # Generate page previews
        previews = []
        for page_num in range(info['pages']):
            preview = generate_pdf_preview(temp_path, page_num)
            previews.append({
                'page_number': page_num + 1,
                'preview': preview,
                'selected': True
            })
        
        # Move file to uploads
        final_path = UPLOAD_FOLDER / f"{uuid.uuid4()}_{filename}"
        shutil.move(str(temp_path), str(final_path))
        
        return jsonify({
            'success': True,
            'file_id': str(uuid.uuid4()),
            'filename': filename,
            'file_path': str(final_path),
            'info': info,
            'pages': previews,
            'total_pages': info['pages']
        })
        
    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({'error': f'Upload error: {str(e)}'}), 500


@app.route('/api/pages/extract', methods=['POST'])
def extract_pages():
    """
    Extract specific pages from a PDF.
    
    Expects:
        - JSON with file_path and pages array
        
    Returns:
        - Download URLs for extracted pages
    """
    try:
        data = request.get_json()
        if not data or 'file_path' not in data or 'pages' not in data:
            return jsonify({'error': 'Missing file_path or pages'}), 400
        
        file_path = Path(data['file_path'])
        pages = data['pages']  # List of page numbers (1-indexed)
        
        if not file_path.exists():
            return jsonify({'error': 'File not found'}), 404
        
        # Convert to 0-indexed
        pages_0_indexed = [p - 1 for p in pages]
        
        # Extract pages
        extracted_files = extract_pdf_pages(file_path, pages_0_indexed)
        
        if not extracted_files:
            return jsonify({'error': 'Failed to extract pages'}), 500
        
        # Generate download URLs
        download_urls = []
        for extracted_file in extracted_files:
            download_urls.append(f'/api/download/{extracted_file.name}')
        
        return jsonify({
            'success': True,
            'pages_extracted': len(extracted_files),
            'download_urls': download_urls
        })
        
    except Exception as e:
        print(f"Page extraction error: {e}")
        return jsonify({'error': f'Page extraction error: {str(e)}'}), 500


@app.route('/api/pages/preview/<filename>', methods=['GET'])
def get_page_preview(filename):
    """
    Get preview for a specific page of a PDF.
    
    Args:
        filename: Name of the PDF file
        page: Page number (query parameter)
        
    Returns:
        - Base64 encoded preview image
    """
    try:
        page = request.args.get('page', 1, type=int)
        file_path = UPLOAD_FOLDER / secure_filename(filename)
        
        if not file_path.exists():
            return jsonify({'error': 'File not found'}), 404
        
        preview = generate_pdf_preview(file_path, page - 1)
        
        if not preview:
            return jsonify({'error': 'Failed to generate preview'}), 500
        
        return jsonify({
            'success': True,
            'preview': preview,
            'page': page
        })
        
    except Exception as e:
        print(f"Preview error: {e}")
        return jsonify({'error': f'Preview error: {str(e)}'}), 500


# Enhanced merge endpoint with page selection
@app.route('/api/merge/enhanced', methods=['POST'])
def merge_enhanced():
    """
    Enhanced merge with page selection and reordering.
    
    Expects:
        - JSON with files array containing file_path and selected_pages
        - Optional output_name for custom filename
        
    Returns:
        - Success status and download URL
    """
    try:
        data = request.get_json()
        if not data or 'files' not in data:
            return jsonify({'error': 'No files provided'}), 400
        
        files_data = data['files']
        
        if not files_data or len(files_data) == 0:
            return jsonify({'error': 'No files to merge'}), 400
        
        # Collect all pages to merge
        all_pages = []
        
        for file_data in files_data:
            file_path = Path(file_data['file_path'])
            selected_pages = file_data.get('selected_pages', [])
            
            if not file_path.exists():
                return jsonify({'error': f'File not found: {file_path}'}), 404
            
            if not selected_pages:
                # If no pages specified, use all pages
                info = PDFTools.get_pdf_info(file_path)
                selected_pages = list(range(1, info['pages'] + 1))
            
            # Extract selected pages
            pages_0_indexed = [p - 1 for p in selected_pages]
            extracted_files = extract_pdf_pages(file_path, pages_0_indexed)
            all_pages.extend(extracted_files)
        
        if not all_pages:
            return jsonify({'error': 'No pages to merge'}), 400
        
        # Merge all extracted pages
        output_name = data.get('output_name', 'merged_enhanced.pdf')
        if not output_name.endswith('.pdf'):
            output_name += '.pdf'
        
        output_path = UPLOAD_FOLDER / output_name
        result = PDFTools.merge_pdfs(all_pages, output_path)
        
        # Clean up temporary extracted pages
        for temp_file in all_pages:
            if temp_file.exists():
                temp_file.unlink()
        
        if result:
            return jsonify({
                'success': True,
                'message': f'Successfully merged selected pages',
                'filename': output_name,
                'download_url': f'/api/download/{output_name}'
            })
        else:
            return jsonify({'error': 'Failed to merge pages'}), 500
            
    except Exception as e:
        print(f"Enhanced merge error: {e}")
        return jsonify({'error': f'Enhanced merge error: {str(e)}'}), 500


# Original endpoints (kept for backward compatibility)
@app.route('/api/merge', methods=['POST'])
def merge_pdfs():
    """Original merge endpoint - merge entire PDFs."""
    try:
        cleanup_old_files(UPLOAD_FOLDER)
        cleanup_old_files(TEMP_FOLDER)
        
        if 'files' not in request.files:
            return jsonify({'error': 'No files provided'}), 400
        
        files = request.files.getlist('files')
        
        if len(files) < 2:
            return jsonify({'error': 'At least 2 files are required for merging'}), 400
        
        # Validate files
        pdf_files = []
        temp_files = []
        
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                temp_path = TEMP_FOLDER / f"{uuid.uuid4()}_{filename}"
                
                file.save(temp_path)
                temp_files.append(temp_path)
                
                # Validate PDF
                if PDFTools.validate_pdf(temp_path):
                    pdf_files.append(temp_path)
                else:
                    temp_path.unlink()
                    return jsonify({'error': f'Invalid PDF file: {filename}'}), 400
            else:
                return jsonify({'error': f'Invalid file type: {file.filename}'}), 400
        
        if len(pdf_files) < 2:
            # Clean up temp files
            for temp_file in temp_files:
                if temp_file.exists():
                    temp_file.unlink()
            return jsonify({'error': 'At least 2 valid PDF files are required'}), 400
        
        # Get custom output name if provided
        output_name = request.form.get('output_name', '').strip()
        if output_name and not output_name.endswith('.pdf'):
            output_name += '.pdf'
        
        # Merge PDFs
        output_filename = output_name or f"merged_{uuid.uuid4()}.pdf"
        output_path = UPLOAD_FOLDER / output_filename
        
        result = PDFTools.merge_pdfs(pdf_files, output_path)
        
        # Clean up temporary files
        for temp_file in temp_files:
            if temp_file.exists():
                temp_file.unlink()
        
        if result:
            return jsonify({
                'success': True,
                'message': f'Successfully merged {len(pdf_files)} PDF files',
                'filename': output_filename,
                'download_url': f'/api/download/{output_filename}'
            })
        else:
            return jsonify({'error': 'Failed to merge PDFs'}), 500
            
    except Exception as e:
        print(f"Merge error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/split', methods=['POST'])
def split_pdf():
    """Original split endpoint - split entire PDF."""
    try:
        cleanup_old_files(UPLOAD_FOLDER)
        cleanup_old_files(TEMP_FOLDER)
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if not file or file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        temp_path = TEMP_FOLDER / f"{uuid.uuid4()}_{filename}"
        file.save(temp_path)
        
        # Validate PDF
        if not PDFTools.validate_pdf(temp_path):
            temp_path.unlink()
            return jsonify({'error': 'Invalid PDF file'}), 400
        
        # Split PDF
        split_output_dir = TEMP_FOLDER / f"split_{uuid.uuid4()}"
        split_files = PDFTools.split_pdf(temp_path, split_output_dir)
        
        # Move split files to uploads directory
        download_urls = []
        if split_files:
            for split_file in split_files:
                final_path = UPLOAD_FOLDER / split_file.name
                shutil.move(str(split_file), str(final_path))
                download_urls.append(f'/api/download/{split_file.name}')
        
        # Clean up temporary files
        temp_path.unlink()
        if split_output_dir.exists():
            shutil.rmtree(split_output_dir)
        
        if split_files:
            return jsonify({
                'success': True,
                'message': f'Successfully split PDF into {len(split_files)} pages',
                'pages': len(split_files),
                'download_urls': download_urls
            })
        else:
            return jsonify({'error': 'Failed to split PDF'}), 500
            
    except Exception as e:
        print(f"Split error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download a processed PDF file."""
    try:
        # Security check - ensure filename is safe
        filename = secure_filename(filename)
        file_path = UPLOAD_FOLDER / filename
        
        if not file_path.exists():
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(
            file_path,
            as_attachment=True,
            download_name=filename,
            mimetype='application/pdf'
        )
        
    except Exception as e:
        print(f"Download error: {e}")
        return jsonify({'error': f'Download error: {str(e)}'}), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large errors."""
    return jsonify({'error': f'File too large. Maximum size is {MAX_FILE_SIZE // (1024*1024)}MB'}), 413


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/documents', methods=['GET'])
def get_documents():
    """Get list of all uploaded documents."""
    try:
        documents = []
        for file_path in UPLOAD_FOLDER.glob('*.pdf'):
            try:
                info = PDFTools.get_pdf_info(file_path)
                documents.append({
                    'id': str(uuid.uuid4()),
                    'name': file_path.name,
                    'size': file_path.stat().st_size,
                    'pages': info.get('pages', 0),
                    'created_at': datetime.fromtimestamp(file_path.stat().st_ctime).isoformat(),
                    'file_path': str(file_path)
                })
            except Exception as e:
                print(f"Error getting info for {file_path}: {e}")
                continue
        
        return jsonify({
            'success': True,
            'data': documents,
            'count': len(documents)
        })
        
    except Exception as e:
        print(f"Get documents error: {e}")
        return jsonify({'error': f'Failed to get documents: {str(e)}'}), 500


@app.route('/api/documents/<document_id>/preview', methods=['GET'])
def get_document_preview(document_id: str):
    """Get preview images for all pages of a document."""
    try:
        # Find the document by ID (simplified - in production use proper mapping)
        pdf_files = list(UPLOAD_FOLDER.glob('*.pdf'))
        if not pdf_files:
            return jsonify({'error': 'No documents found'}), 404
        
        # For simplicity, use the first PDF file
        # In production, you'd map document_id to actual file
        file_path = pdf_files[0]
        
        # Get document info
        info = PDFTools.get_pdf_info(file_path)
        total_pages = info.get('pages', 0)
        
        # Generate previews for all pages
        previews = []
        for page_num in range(min(total_pages, 10)):  # Limit to first 10 pages for performance
            preview = generate_pdf_preview(file_path, page_num)
            if preview:
                previews.append({
                    'page_number': page_num + 1,
                    'preview': preview
                })
        
        return jsonify({
            'success': True,
            'data': {
                'document_id': document_id,
                'total_pages': total_pages,
                'previews': previews,
                'preview_url': f'/api/pages/preview/{file_path.name}'
            }
        })
        
    except Exception as e:
        print(f"Document preview error: {e}")
        return jsonify({'error': f'Failed to generate preview: {str(e)}'}), 500


@app.route('/api/pages/merge', methods=['POST'])
def merge_pages():
    """
    Merge specific pages from different documents.
    
    Expects:
        - JSON with page_ids array containing page identifiers
        
    Returns:
        - Success status and merged file info
    """
    try:
        data = request.get_json()
        if not data or 'page_ids' not in data:
            return jsonify({'error': 'No page IDs provided'}), 400
        
        page_ids = data['page_ids']
        if not page_ids or len(page_ids) == 0:
            return jsonify({'error': 'No pages to merge'}), 400
        
        # For simplicity, extract pages from available PDFs
        # In production, you'd map page_ids to actual pages
        pdf_files = list(UPLOAD_FOLDER.glob('*.pdf'))
        if not pdf_files:
            return jsonify({'error': 'No source documents found'}), 404
        
        # Extract first page from each available PDF as example
        extracted_files = []
        for i, pdf_file in enumerate(pdf_files[:len(page_ids)]):
            extracted = extract_pdf_pages(pdf_file, [0])  # Extract first page
            if extracted:
                extracted_files.extend(extracted)
        
        if not extracted_files:
            return jsonify({'error': 'Failed to extract pages'}), 500
        
        # Merge extracted pages
        output_filename = f"merged_pages_{uuid.uuid4()}.pdf"
        output_path = UPLOAD_FOLDER / output_filename
        result = PDFTools.merge_pdfs(extracted_files, output_path)
        
        # Clean up temporary files
        for temp_file in extracted_files:
            if temp_file.exists():
                temp_file.unlink()
        
        if result:
            return jsonify({
                'success': True,
                'data': {
                    'file_id': str(uuid.uuid4()),
                    'filename': output_filename,
                    'pages_merged': len(page_ids)
                }
            })
        else:
            return jsonify({'error': 'Failed to merge pages'}), 500
            
    except Exception as e:
        print(f"Pages merge error: {e}")
        return jsonify({'error': f'Failed to merge pages: {str(e)}'}), 500


@app.route('/api/documents/<document_id>/split', methods=['POST'])
def split_document(document_id: str):
    """
    Split a document into individual pages.
    
    Args:
        document_id: ID of the document to split
        
    Returns:
        - Success status and split file info
    """
    try:
        # Find the document (simplified - in production use proper mapping)
        pdf_files = list(UPLOAD_FOLDER.glob('*.pdf'))
        if not pdf_files:
            return jsonify({'error': 'No documents found'}), 404
        
        # For simplicity, use the first PDF file
        file_path = pdf_files[0]
        
        # Get document info
        info = PDFTools.get_pdf_info(file_path)
        total_pages = info.get('pages', 0)
        
        if total_pages == 0:
            return jsonify({'error': 'Document has no pages'}), 400
        
        # Split into individual pages
        split_files = []
        for page_num in range(total_pages):
            extracted = extract_pdf_pages(file_path, [page_num])
            if extracted:
                # Move to uploads directory
                final_path = UPLOAD_FOLDER / f"page_{page_num + 1}_of_{file_path.stem}.pdf"
                if extracted[0].exists():
                    extracted[0].rename(final_path)
                    split_files.append({
                        'fileId': str(uuid.uuid4()),
                        'filename': final_path.name,
                        'pageNumber': page_num + 1
                    })
        
        return jsonify({
            'success': True,
            'data': {
                'files': split_files,
                'total_pages': total_pages
            }
        })
        
    except Exception as e:
        print(f"Document split error: {e}")
        return jsonify({'error': f'Failed to split document: {str(e)}'}), 500


@app.route('/api/documents/<document_id>/extract', methods=['POST'])
def extract_document_pages(document_id: str):
    """
    Extract specific pages from a document.
    
    Args:
        document_id: ID of the document
        
    Expects:
        - JSON with page_numbers array
        
    Returns:
        - Success status and extracted file info
    """
    try:
        data = request.get_json()
        if not data or 'page_numbers' not in data:
            return jsonify({'error': 'No page numbers provided'}), 400
        
        page_numbers = data['page_numbers']
        if not page_numbers or len(page_numbers) == 0:
            return jsonify({'error': 'No pages to extract'}), 400
        
        # Find the document (simplified)
        pdf_files = list(UPLOAD_FOLDER.glob('*.pdf'))
        if not pdf_files:
            return jsonify({'error': 'No documents found'}), 404
        
        file_path = pdf_files[0]
        page_indices = [p - 1 for p in page_numbers]  # Convert to 0-indexed
        
        # Extract pages
        extracted_files = extract_pdf_pages(file_path, page_indices)
        
        if not extracted_files:
            return jsonify({'error': 'Failed to extract pages'}), 500
        
        # Move to uploads directory
        result_files = []
        for i, extracted_file in enumerate(extracted_files):
            final_path = UPLOAD_FOLDER / f"extracted_pages_{i + 1}_{uuid.uuid4()}.pdf"
            if extracted_file.exists():
                extracted_file.rename(final_path)
                result_files.append({
                    'fileId': str(uuid.uuid4()),
                    'filename': final_path.name,
                    'pageNumbers': page_numbers[i] if i < len(page_numbers) else page_numbers
                })
        
        return jsonify({
            'success': True,
            'data': {
                'files': result_files,
                'pages_extracted': len(page_numbers)
            }
        })
        
    except Exception as e:
        print(f"Pages extraction error: {e}")
        return jsonify({'error': f'Failed to extract pages: {str(e)}'}), 500


if __name__ == '__main__':
    # Run in debug mode for development
    app.run(debug=True, host='0.0.0.0', port=5000)