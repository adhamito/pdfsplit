#!/usr/bin/env python3
"""
PDF Management Tools
A comprehensive set of tools for PDF manipulation including merge, split, and validation.
"""

import os
import tempfile
import shutil
from pathlib import Path
from typing import List, Optional, Union
import PyPDF2
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
import fitz  # PyMuPDF
import pdfplumber
import pandas as pd


class PDFTools:
    """A class containing various PDF manipulation tools."""
    
    @staticmethod
    def validate_pdf(file_path: Union[str, Path]) -> bool:
        """
        Validate if a file is a valid PDF.
        
        Args:
            file_path: Path to the file to validate
            
        Returns:
            bool: True if valid PDF, False otherwise
        """
        try:
            file_path = Path(file_path)
            
            # Check if file exists
            if not file_path.exists():
                return False
            
            # Check file extension
            if file_path.suffix.lower() != '.pdf':
                return False
            
            # Try to open and read PDF
            with open(file_path, 'rb') as file:
                reader = PdfReader(file)
                # Basic validation - check if PDF has pages
                if len(reader.pages) == 0:
                    return False
                
                # Try to access first page to ensure PDF is readable
                try:
                    reader.pages[0]
                except Exception:
                    return False
                
            return True
            
        except Exception as e:
            print(f"PDF validation error: {e}")
            return False
    
    @staticmethod
    def merge_pdfs(pdf_files: List[Union[str, Path]], output_path: Optional[Union[str, Path]] = None) -> Optional[Path]:
        """
        Merge multiple PDF files into a single PDF.
        
        Args:
            pdf_files: List of paths to PDF files to merge
            output_path: Optional output path for merged PDF
            
        Returns:
            Path: Path to merged PDF file, or None if failed
        """
        try:
            # Validate all input files
            valid_pdfs = []
            for pdf_file in pdf_files:
                if PDFTools.validate_pdf(pdf_file):
                    valid_pdfs.append(pdf_file)
                else:
                    print(f"Warning: Skipping invalid PDF file: {pdf_file}")
            
            if not valid_pdfs:
                raise ValueError("No valid PDF files provided for merging")
            
            # Create output path if not provided
            if output_path is None:
                first_pdf = Path(valid_pdfs[0])
                output_path = first_pdf.parent / f"{first_pdf.stem}_merged.pdf"
            else:
                output_path = Path(output_path)
            
            # Ensure output directory exists
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Merge PDFs
            merger = PdfMerger()
            
            for pdf_file in valid_pdfs:
                with open(pdf_file, 'rb') as file:
                    merger.append(file)
            
            # Write merged PDF
            with open(output_path, 'wb') as output_file:
                merger.write(output_file)
            
            merger.close()
            
            print(f"Successfully merged {len(valid_pdfs)} PDF files into: {output_path}")
            return output_path
            
        except Exception as e:
            print(f"Error merging PDFs: {e}")
            return None
    
    @staticmethod
    def split_pdf(pdf_file: Union[str, Path], output_dir: Optional[Union[str, Path]] = None) -> Optional[List[Path]]:
        """
        Split a PDF file into individual pages.
        
        Args:
            pdf_file: Path to PDF file to split
            output_dir: Optional output directory for split pages
            
        Returns:
            List[Path]: List of paths to split PDF files, or None if failed
        """
        try:
            # Validate input PDF
            if not PDFTools.validate_pdf(pdf_file):
                raise ValueError(f"Invalid PDF file: {pdf_file}")
            
            pdf_path = Path(pdf_file)
            
            # Create output directory if not provided
            if output_dir is None:
                output_dir = pdf_path.parent / f"{pdf_path.stem}_split"
            else:
                output_dir = Path(output_dir)
            
            # Ensure output directory exists
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # Read PDF
            with open(pdf_file, 'rb') as file:
                reader = PdfReader(file)
                total_pages = len(reader.pages)
                
                if total_pages == 0:
                    raise ValueError("PDF has no pages")
                
                split_files = []
                
                # Split each page into separate PDF
                for page_num in range(total_pages):
                    writer = PdfWriter()
                    writer.add_page(reader.pages[page_num])
                    
                    # Create output filename
                    output_filename = output_dir / f"{pdf_path.stem}_page_{page_num + 1:03d}.pdf"
                    
                    # Write single page PDF
                    with open(output_filename, 'wb') as output_file:
                        writer.write(output_file)
                    
                    split_files.append(output_filename)
                    print(f"Created: {output_filename}")
                
                print(f"Successfully split PDF into {len(split_files)} pages")
                return split_files
                
        except Exception as e:
            print(f"Error splitting PDF: {e}")
            return None
    
    @staticmethod
    def compress_pdf(pdf_file: Union[str, Path], output_path: Optional[Union[str, Path]] = None) -> Optional[Path]:
        """
        Compress a PDF file by reducing file size (lossless compression).
        
        Args:
            pdf_file: Path to PDF file to compress
            output_path: Optional output path for compressed PDF
            
        Returns:
            Path: Path to compressed PDF file, or None if failed
        """
        try:
            # Validate input PDF
            if not PDFTools.validate_pdf(pdf_file):
                raise ValueError(f"Invalid PDF file: {pdf_file}")
            
            pdf_path = Path(pdf_file)
            
            # Create output path if not provided
            if output_path is None:
                output_path = pdf_path.parent / f"{pdf_path.stem}_compressed.pdf"
            else:
                output_path = Path(output_path)
            
            # Read PDF
            reader = PdfReader(pdf_file)
            writer = PdfWriter()
            
            # Add all pages to writer and compress
            for page in reader.pages:
                page.compress_content_streams()  # This compresses the page content
                writer.add_page(page)
            
            # Reduce metadata
            if reader.metadata:
                writer.add_metadata(reader.metadata)
            
            # Write compressed PDF
            with open(output_path, 'wb') as output_file:
                writer.write(output_file)
            
            # Check if size actually decreased
            original_size = pdf_path.stat().st_size
            new_size = output_path.stat().st_size
            
            print(f"Compressed PDF: {original_size} -> {new_size} bytes")
            return output_path
            
        except Exception as e:
            print(f"Error compressing PDF: {e}")
            return None

    @staticmethod
    def convert_to_images(pdf_file: Union[str, Path], output_dir: Optional[Union[str, Path]] = None, dpi: int = 300, fmt: str = "png") -> Optional[List[Path]]:
        """
        Convert PDF pages to images.
        
        Args:
            pdf_file: Path to PDF file
            output_dir: Directory to save images
            dpi: Resolution (dots per inch)
            fmt: Image format (png, jpg, jpeg)
            
        Returns:
            List[Path]: List of paths to generated images, or None if failed
        """
        try:
            # Validate input PDF
            if not PDFTools.validate_pdf(pdf_file):
                raise ValueError(f"Invalid PDF file: {pdf_file}")
            
            pdf_path = Path(pdf_file)
            
            # Create output directory if not provided
            if output_dir is None:
                output_dir = pdf_path.parent / f"{pdf_path.stem}_images"
            else:
                output_dir = Path(output_dir)
            
            # Ensure output directory exists
            output_dir.mkdir(parents=True, exist_ok=True)
            
            doc = fitz.open(pdf_file)
            image_paths = []
            
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                pix = page.get_pixmap(dpi=dpi)
                
                output_filename = output_dir / f"{pdf_path.stem}_page_{page_num + 1:03d}.{fmt}"
                pix.save(str(output_filename))
                image_paths.append(output_filename)
                
            print(f"Converted PDF to {len(image_paths)} images in {output_dir}")
            return image_paths
            
        except Exception as e:
            print(f"Error converting PDF to images: {e}")
            return None

    @staticmethod
    def get_pdf_info(pdf_file: Union[str, Path]) -> Optional[dict]:
        """
        Get information about a PDF file.
        
        Args:
            pdf_file: Path to PDF file
            
        Returns:
            dict: PDF information including page count, title, author, etc.
        """
        try:
            if not PDFTools.validate_pdf(pdf_file):
                return None
            
            with open(pdf_file, 'rb') as file:
                reader = PdfReader(file)
                
                info = {
                    'pages': len(reader.pages),
                    'file_size': Path(pdf_file).stat().st_size,
                    'filename': Path(pdf_file).name
                }
                
                # Get metadata if available
                if reader.metadata:
                    info.update({
                        'title': reader.metadata.get('/Title', ''),
                        'author': reader.metadata.get('/Author', ''),
                        'subject': reader.metadata.get('/Subject', ''),
                        'creator': reader.metadata.get('/Creator', ''),
                        'producer': reader.metadata.get('/Producer', ''),
                        'creation_date': reader.metadata.get('/CreationDate', ''),
                        'modification_date': reader.metadata.get('/ModDate', '')
                    })
                
                return info
                
        except Exception as e:
            print(f"Error getting PDF info: {e}")
            return None

    @staticmethod
    def convert_to_excel(pdf_file: Union[str, Path], output_path: Optional[Union[str, Path]] = None) -> Optional[Path]:
        """
        Convert PDF tables to Excel.
        
        Args:
            pdf_file: Path to PDF file
            output_path: Output Excel file path
            
        Returns:
            Path: Path to generated Excel file, or None if failed
        """
        try:
            if not PDFTools.validate_pdf(pdf_file):
                raise ValueError(f"Invalid PDF file: {pdf_file}")
            
            pdf_path = Path(pdf_file)
            
            if output_path is None:
                output_path = pdf_path.parent / f"{pdf_path.stem}.xlsx"
            else:
                output_path = Path(output_path)
            
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            with pdfplumber.open(pdf_file) as pdf:
                with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
                    has_tables = False
                    for i, page in enumerate(pdf.pages):
                        tables = page.extract_tables()
                        for j, table in enumerate(tables):
                            if table:
                                has_tables = True
                                df = pd.DataFrame(table[1:], columns=table[0])
                                sheet_name = f"Page_{i+1}_Table_{j+1}"
                                # Excel sheet name limit is 31 chars
                                if len(sheet_name) > 31:
                                    sheet_name = sheet_name[:31]
                                df.to_excel(writer, sheet_name=sheet_name, index=False)
                    
                    if not has_tables:
                        # Create an empty sheet if no tables found
                        pd.DataFrame(["No tables found in PDF"]).to_excel(writer, sheet_name="Info", header=False, index=False)
            
            return output_path
            
        except Exception as e:
            print(f"Error converting PDF to Excel: {e}")
            return None


def main():
    """Example usage of PDF tools."""
    import argparse
    
    parser = argparse.ArgumentParser(description='PDF Management Tools')
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Merge command
    merge_parser = subparsers.add_parser('merge', help='Merge multiple PDF files')
    merge_parser.add_argument('files', nargs='+', help='PDF files to merge')
    merge_parser.add_argument('-o', '--output', help='Output file path')
    
    # Split command
    split_parser = subparsers.add_parser('split', help='Split PDF into pages')
    split_parser.add_argument('file', help='PDF file to split')
    split_parser.add_argument('-o', '--output-dir', help='Output directory')
    
    # Validate command
    validate_parser = subparsers.add_parser('validate', help='Validate PDF file')
    validate_parser.add_argument('file', help='PDF file to validate')
    
    # Info command
    info_parser = subparsers.add_parser('info', help='Get PDF information')
    info_parser.add_argument('file', help='PDF file to analyze')
    
    args = parser.parse_args()
    
    if args.command == 'merge':
        result = PDFTools.merge_pdfs(args.files, args.output)
        if result:
            print(f"Merge successful: {result}")
        else:
            print("Merge failed")
    
    elif args.command == 'split':
        result = PDFTools.split_pdf(args.file, args.output_dir)
        if result:
            print(f"Split successful: {len(result)} pages created")
        else:
            print("Split failed")
    
    elif args.command == 'validate':
        is_valid = PDFTools.validate_pdf(args.file)
        print(f"PDF is valid: {is_valid}")
    
    elif args.command == 'info':
        info = PDFTools.get_pdf_info(args.file)
        if info:
            print("PDF Information:")
            for key, value in info.items():
                print(f"  {key}: {value}")
        else:
            print("Failed to get PDF information")
    
    else:
        parser.print_help()


if __name__ == "__main__":
    main()