#!/usr/bin/env python3
"""
PDF Management System Backend API
A Flask-based API for PDF merging and splitting operations.
"""

import os
import sys
import uuid
import shutil
import zipfile
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any

import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

# Add scripts directory to Python path
sys.path.append(str(Path(__file__).parent / 'scripts'))
from pdf_tools import PDFTools

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175', 'https://deft-taffy-a8b825.netlify.app'])

# Configuration
if os.environ.get('VERCEL'):
    # Vercel-specific configuration (read-only file system except /tmp)
    UPLOAD_FOLDER = Path('/tmp/uploads')
    TEMP_FOLDER = Path('/tmp/temp')
    DATA_FOLDER = Path('/tmp/data')
else:
    # Local/Standard configuration
    UPLOAD_FOLDER = Path(__file__).parent / 'uploads'
    TEMP_FOLDER = Path(__file__).parent / 'temp'
    DATA_FOLDER = Path(__file__).parent / 'data'

TEMPLATES_FILE = DATA_FOLDER / 'templates.json'
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB max file size
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure directories exist
try:
    UPLOAD_FOLDER.mkdir(exist_ok=True, parents=True)
    TEMP_FOLDER.mkdir(exist_ok=True, parents=True)
    DATA_FOLDER.mkdir(exist_ok=True, parents=True)
except Exception as e:
    print(f"Warning: Could not create directories: {e}")

if not TEMPLATES_FILE.exists():
    try:
        with open(TEMPLATES_FILE, 'w') as f:
            json.dump([], f)
    except Exception as e:
        print(f"Warning: Could not create templates file: {e}")

app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TEMP_FOLDER'] = TEMP_FOLDER


def allowed_file(filename: str) -> bool:
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })


@app.route('/api/merge', methods=['POST'])
def merge_pdfs():
    """
    Merge multiple PDF files.
    
    Expects:
        - Form data with 'files' containing multiple PDF files
        - Optional 'output_name' for custom output filename
    
    Returns:
        - JSON with success status and download URL
    """
    try:
        # Clean up old files before processing
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
    """
    Split a PDF file into individual pages.
    
    Expects:
        - Form data with 'file' containing a single PDF file
    
    Returns:
        - JSON with success status and list of download URLs
    """
    try:
        # Clean up old files before processing
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
            # Create a ZIP file of split pages
            zip_filename = f"split_{uuid.uuid4()}.zip"
            zip_path = UPLOAD_FOLDER / zip_filename
            
            with zipfile.ZipFile(zip_path, 'w') as zipf:
                for split_file in split_files:
                    zipf.write(split_file, split_file.name)
                    
            # Move individual files (optional, but good for direct access if needed)
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
                'download_urls': download_urls,
                'zip_url': f'/api/download/{zip_filename}'
            })
        else:
            return jsonify({'error': 'Failed to split PDF'}), 500
            
    except Exception as e:
        print(f"Split error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/compress', methods=['POST'])
def compress_pdf():
    """
    Compress a PDF file.
    
    Expects:
        - Form data with 'file' containing a single PDF file
    
    Returns:
        - JSON with success status and download URL
    """
    try:
        # Clean up old files before processing
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
        
        # Compress PDF
        output_filename = f"compressed_{uuid.uuid4()}_{filename}"
        output_path = UPLOAD_FOLDER / output_filename
        
        result = PDFTools.compress_pdf(temp_path, output_path)
        
        # Clean up temporary files
        temp_path.unlink()
        
        if result:
            return jsonify({
                'success': True,
                'message': 'Successfully compressed PDF',
                'filename': output_filename,
                'download_url': f'/api/download/{output_filename}'
            })
        else:
            return jsonify({'error': 'Failed to compress PDF'}), 500
            
    except Exception as e:
        print(f"Compress error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/convert-to-images', methods=['POST'])
def convert_to_images():
    """
    Convert a PDF file to images.
    
    Expects:
        - Form data with 'file' containing a single PDF file
        - Optional 'format' (png/jpg) and 'dpi'
    
    Returns:
        - JSON with success status and download URL (zip file)
    """
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
        
        # Get options
        fmt = request.form.get('format', 'png')
        dpi = int(request.form.get('dpi', 300))
        
        filename = secure_filename(file.filename)
        temp_path = TEMP_FOLDER / f"{uuid.uuid4()}_{filename}"
        file.save(temp_path)
        
        if not PDFTools.validate_pdf(temp_path):
            temp_path.unlink()
            return jsonify({'error': 'Invalid PDF file'}), 400
        
        # Create a unique directory for images
        images_dir = TEMP_FOLDER / f"images_{uuid.uuid4()}"
        
        # Convert to images
        image_paths = PDFTools.convert_to_images(temp_path, images_dir, dpi=dpi, fmt=fmt)
        
        if not image_paths:
            temp_path.unlink()
            if images_dir.exists():
                shutil.rmtree(images_dir)
            return jsonify({'error': 'Failed to convert PDF to images'}), 500
        
        # Zip the images
        zip_filename = f"images_{uuid.uuid4()}_{Path(filename).stem}.zip"
        zip_path = UPLOAD_FOLDER / zip_filename
        
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for img_path in image_paths:
                zipf.write(img_path, img_path.name)
        
        # Clean up
        temp_path.unlink()
        shutil.rmtree(images_dir)
        
        return jsonify({
            'success': True,
            'message': 'Successfully converted PDF to images',
            'filename': zip_filename,
            'download_url': f'/api/download/{zip_filename}'
        })
        
    except Exception as e:
        print(f"Convert error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/convert-to-excel', methods=['POST'])
def convert_to_excel():
    """
    Convert a PDF file to Excel.
    
    Expects:
        - Form data with 'file' containing a single PDF file
    
    Returns:
        - JSON with success status and download URL (xlsx file)
    """
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
        
        filename = secure_filename(file.filename)
        temp_path = TEMP_FOLDER / f"{uuid.uuid4()}_{filename}"
        file.save(temp_path)
        
        if not PDFTools.validate_pdf(temp_path):
            temp_path.unlink()
            return jsonify({'error': 'Invalid PDF file'}), 400
        
        excel_filename = f"excel_{uuid.uuid4()}_{Path(filename).stem}.xlsx"
        excel_path = UPLOAD_FOLDER / excel_filename
        
        result_path = PDFTools.convert_to_excel(temp_path, excel_path)
        
        temp_path.unlink()
        
        if not result_path:
            return jsonify({'error': 'Failed to convert PDF to Excel'}), 500
        
        return jsonify({
            'success': True,
            'message': 'Successfully converted PDF to Excel',
            'filename': excel_filename,
            'download_url': f'/api/download/{excel_filename}'
        })
        
    except Exception as e:
        print(f"Convert to Excel error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/validate', methods=['POST'])
def validate_pdf():
    """
    Validate a PDF file.
    
    Expects:
        - Form data with 'file' containing a PDF file
    
    Returns:
        - JSON with validation result and PDF information
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if not file or file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save uploaded file temporarily
        filename = secure_filename(file.filename)
        temp_path = TEMP_FOLDER / f"validate_{uuid.uuid4()}_{filename}"
        file.save(temp_path)
        
        # Validate PDF
        is_valid = PDFTools.validate_pdf(temp_path)
        
        # Get PDF info if valid
        info = None
        if is_valid:
            info = PDFTools.get_pdf_info(temp_path)
        
        # Clean up temporary file
        temp_path.unlink()
        
        return jsonify({
            'valid': is_valid,
            'filename': filename,
            'info': info
        })
        
    except Exception as e:
        print(f"Validation error: {e}")
        return jsonify({'error': f'Validation error: {str(e)}'}), 500


@app.route('/api/workflow', methods=['POST'])
def execute_workflow():
    """
    Execute a workflow of PDF operations.
    
    Expects:
        - Form data with 'files' containing initial PDF files
        - Form data with 'workflow' containing JSON string of steps
    
    Returns:
        - JSON with success status and download URL(s)
    """
    try:
        # Clean up old files
        cleanup_old_files(UPLOAD_FOLDER)
        cleanup_old_files(TEMP_FOLDER)
        
        if 'files' not in request.files:
            return jsonify({'error': 'No files provided'}), 400
            
        files = request.files.getlist('files')
        workflow_json = request.form.get('workflow')
        
        if not workflow_json:
            return jsonify({'error': 'No workflow definition provided'}), 400
            
        try:
            workflow_steps = json.loads(workflow_json)
        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid workflow JSON'}), 400
            
        if not files:
            return jsonify({'error': 'No files selected'}), 400
            
        # Session ID for this workflow execution
        session_id = str(uuid.uuid4())
        session_temp_dir = TEMP_FOLDER / session_id
        session_temp_dir.mkdir(exist_ok=True)
        
        # Save initial files
        current_files = []
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = session_temp_dir / filename
                file.save(file_path)
                if PDFTools.validate_pdf(file_path):
                    current_files.append(file_path)
                else:
                    file_path.unlink()
        
        if not current_files:
            shutil.rmtree(session_temp_dir)
            return jsonify({'error': 'No valid PDF files provided'}), 400
            
        # Process steps
        for step in workflow_steps:
            step_type = step.get('type')
            
            if step_type == 'merge':
                if len(current_files) < 2:
                    continue
                    
                output_filename = f"step_{step['id']}_merged.pdf"
                output_path = session_temp_dir / output_filename
                
                result = PDFTools.merge_pdfs(current_files, output_path)
                
                if result:
                    # Remove old files if they are temp files in our session dir
                    for f in current_files:
                        if session_temp_dir in f.parents:
                            try:
                                f.unlink()
                            except:
                                pass
                    current_files = [result]
                else:
                    shutil.rmtree(session_temp_dir)
                    return jsonify({'error': f"Failed to execute step: {step['name']}"}), 500
                    
            elif step_type == 'split':
                new_files = []
                for file_path in current_files:
                    split_dir = session_temp_dir / f"step_{step['id']}_split_{file_path.stem}"
                    split_results = PDFTools.split_pdf(file_path, split_dir)
                    if split_results:
                        new_files.extend(split_results)
                        # Remove original file
                        if session_temp_dir in file_path.parents:
                            try:
                                file_path.unlink()
                            except:
                                pass
                
                if new_files:
                    current_files = new_files
                else:
                    shutil.rmtree(session_temp_dir)
                    return jsonify({'error': f"Failed to execute step: {step['name']}"}), 500
            
            # Placeholder for other types
            elif step_type in ['compress', 'convert-to-img', 'convert-to-pdf']:
                 # Not implemented yet, just pass through
                 pass
            
        # Finalize results
        download_urls = []
        
        for i, file_path in enumerate(current_files):
            # Use original name if possible, otherwise generic
            original_name = file_path.name
            if 'step_' in original_name:
                # Try to clean up name a bit or just keep it
                pass
                
            final_name = f"result_{session_id[:8]}_{original_name}"
            dest_path = UPLOAD_FOLDER / final_name
            
            # Move or copy to upload folder
            shutil.copy(str(file_path), str(dest_path))
            download_urls.append(f'/api/download/{final_name}')
            
        # Clean up session temp
        shutil.rmtree(session_temp_dir)
        
        return jsonify({
            'success': True,
            'message': 'Workflow executed successfully',
            'results_count': len(download_urls),
            'download_urls': download_urls
        })
        
    except Exception as e:
        print(f"Workflow error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500



@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    """
    Download a processed PDF file.
    
    Args:
        filename: Name of the file to download
    
    Returns:
        - PDF file for download
    """
    try:
        # Security check - ensure filename is safe
        filename = secure_filename(filename)
        file_path = UPLOAD_FOLDER / filename
        
        if not file_path.exists():
            return jsonify({'error': 'File not found'}), 404
        
        mimetype = 'application/pdf'
        if filename.lower().endswith('.zip'):
            mimetype = 'application/zip'
            
        return send_file(
            file_path,
            as_attachment=True,
            download_name=filename,
            mimetype=mimetype
        )
        
    except Exception as e:
        print(f"Download error: {e}")
        return jsonify({'error': f'Download error: {str(e)}'}), 500


@app.route('/api/cleanup', methods=['POST'])
def cleanup_files():
    """
    Manually trigger cleanup of old files.
    
    Returns:
        - JSON with cleanup result
    """
    try:
        cleanup_old_files(UPLOAD_FOLDER)
        cleanup_old_files(TEMP_FOLDER)
        
        return jsonify({
            'success': True,
            'message': 'Cleanup completed successfully'
        })
        
    except Exception as e:
        print(f"Cleanup error: {e}")
        return jsonify({'error': f'Cleanup error: {str(e)}'}), 500


@app.route('/api/templates', methods=['GET'])
def get_templates():
    """
    Get all saved workflow templates.
    
    Returns:
        - JSON list of templates
    """
    try:
        if not TEMPLATES_FILE.exists():
            return jsonify([])
            
        with open(TEMPLATES_FILE, 'r') as f:
            templates = json.load(f)
            
        return jsonify(templates)
        
    except Exception as e:
        print(f"Get templates error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/templates', methods=['POST'])
def save_template():
    """
    Save a new workflow template.
    
    Expects:
        - JSON with 'name', 'description', and 'steps'
    
    Returns:
        - JSON with success status and template ID
    """
    try:
        data = request.json
        if not data or 'name' not in data or 'steps' not in data:
            return jsonify({'error': 'Invalid template data'}), 400
            
        template = {
            'id': str(uuid.uuid4()),
            'name': data['name'],
            'description': data.get('description', ''),
            'steps': data['steps'],
            'created_at': datetime.now().isoformat()
        }
        
        templates = []
        if TEMPLATES_FILE.exists():
            with open(TEMPLATES_FILE, 'r') as f:
                try:
                    templates = json.load(f)
                except json.JSONDecodeError:
                    templates = []
        
        templates.append(template)
        
        with open(TEMPLATES_FILE, 'w') as f:
            json.dump(templates, f, indent=2)
            
        return jsonify({
            'success': True,
            'message': 'Template saved successfully',
            'template': template
        })
        
    except Exception as e:
        print(f"Save template error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/templates/<template_id>', methods=['DELETE'])
def delete_template(template_id):
    """
    Delete a workflow template.
    
    Args:
        template_id: ID of the template to delete
        
    Returns:
        - JSON with success status
    """
    try:
        if not TEMPLATES_FILE.exists():
            return jsonify({'error': 'Template not found'}), 404
            
        with open(TEMPLATES_FILE, 'r') as f:
            templates = json.load(f)
            
        new_templates = [t for t in templates if t['id'] != template_id]
        
        if len(new_templates) == len(templates):
            return jsonify({'error': 'Template not found'}), 404
            
        with open(TEMPLATES_FILE, 'w') as f:
            json.dump(new_templates, f, indent=2)
            
        return jsonify({
            'success': True,
            'message': 'Template deleted successfully'
        })
        
    except Exception as e:
        print(f"Delete template error: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


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


if __name__ == '__main__':
    # Run in debug mode for development
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)