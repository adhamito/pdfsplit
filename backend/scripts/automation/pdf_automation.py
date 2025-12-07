#!/usr/bin/env python3
"""
PDF Automation Workflow
Automatically processes PDF files in a specified folder at scheduled intervals.
"""

import os
import sys
import time
import logging
import schedule
from pathlib import Path
from datetime import datetime
from typing import List, Optional

# Add scripts directory to Python path
sys.path.append(str(Path(__file__).parent.parent))
from pdf_tools import PDFTools

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('pdf_automation.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class PDFAutomation:
    """Automated PDF processing workflow."""
    
    def __init__(self, 
                 input_folder: str = "pdfs",
                 output_folder: str = "merged",
                 merged_filename: str = "merged.pdf",
                 schedule_time: str = "09:00",
                 cleanup_old_files: bool = True,
                 max_file_age_days: int = 7):
        """
        Initialize PDF automation.
        
        Args:
            input_folder: Folder containing PDFs to process
            output_folder: Folder for output files
            merged_filename: Name of merged PDF file
            schedule_time: Time to run daily (HH:MM format)
            cleanup_old_files: Whether to clean up old files
            max_file_age_days: Maximum age of files before cleanup
        """
        self.input_folder = Path(input_folder)
        self.output_folder = Path(output_folder)
        self.merged_filename = merged_filename
        self.schedule_time = schedule_time
        self.cleanup_old_files = cleanup_old_files
        self.max_file_age_days = max_file_age_days
        
        # Ensure directories exist
        self.input_folder.mkdir(exist_ok=True)
        self.output_folder.mkdir(exist_ok=True)
        
        logger.info(f"PDF Automation initialized")
        logger.info(f"Input folder: {self.input_folder}")
        logger.info(f"Output folder: {self.output_folder}")
        logger.info(f"Schedule time: {self.schedule_time}")
    
    def find_pdf_files(self) -> List[Path]:
        """Find all PDF files in the input folder."""
        pdf_files = []
        
        for file_path in self.input_folder.iterdir():
            if file_path.is_file() and file_path.suffix.lower() == '.pdf':
                if PDFTools.validate_pdf(file_path):
                    pdf_files.append(file_path)
                    logger.info(f"Found valid PDF: {file_path.name}")
                else:
                    logger.warning(f"Skipping invalid PDF: {file_path.name}")
        
        return pdf_files
    
    def merge_pdfs(self, pdf_files: List[Path]) -> Optional[Path]:
        """Merge PDF files."""
        if not pdf_files:
            logger.info("No PDF files to merge")
            return None
        
        output_path = self.output_folder / self.merged_filename
        
        logger.info(f"Merging {len(pdf_files)} PDF files...")
        result = PDFTools.merge_pdfs(pdf_files, output_path)
        
        if result:
            logger.info(f"Successfully merged PDFs: {result}")
            return result
        else:
            logger.error("Failed to merge PDFs")
            return None
    
    def cleanup_old_files(self):
        """Clean up old files in output folder."""
        if not self.cleanup_old_files:
            return
        
        current_time = datetime.now()
        removed_count = 0
        
        for file_path in self.output_folder.iterdir():
            if file_path.is_file():
                file_age = current_time - datetime.fromtimestamp(file_path.stat().st_mtime)
                
                if file_age.days > self.max_file_age_days:
                    try:
                        file_path.unlink()
                        logger.info(f"Removed old file: {file_path.name}")
                        removed_count += 1
                    except Exception as e:
                        logger.error(f"Failed to remove file {file_path}: {e}")
        
        if removed_count > 0:
            logger.info(f"Cleaned up {removed_count} old files")
    
    def move_processed_files(self, pdf_files: List[Path]) -> bool:
        """Move processed files to archive folder."""
        archive_folder = self.input_folder / "archive"
        archive_folder.mkdir(exist_ok=True)
        
        success_count = 0
        
        for pdf_file in pdf_files:
            try:
                # Create archive subfolder with current date
                date_folder = archive_folder / datetime.now().strftime("%Y-%m-%d")
                date_folder.mkdir(exist_ok=True)
                
                # Move file to archive
                new_path = date_folder / pdf_file.name
                pdf_file.rename(new_path)
                logger.info(f"Archived processed file: {pdf_file.name} -> {new_path}")
                success_count += 1
                
            except Exception as e:
                logger.error(f"Failed to archive file {pdf_file}: {e}")
        
        logger.info(f"Archived {success_count}/{len(pdf_files)} files")
        return success_count == len(pdf_files)
    
    def run_daily_task(self):
        """Run the daily PDF processing task."""
        logger.info("Starting daily PDF processing task...")
        
        try:
            # Find PDF files
            pdf_files = self.find_pdf_files()
            
            if not pdf_files:
                logger.info("No PDF files found for processing")
                return
            
            # Merge PDFs
            merged_file = self.merge_pdfs(pdf_files)
            
            if merged_file:
                # Move processed files to archive
                self.move_processed_files(pdf_files)
                
                # Clean up old files
                self.cleanup_old_files()
                
                logger.info("Daily PDF processing task completed successfully")
            else:
                logger.error("Daily PDF processing task failed during merge")
                
        except Exception as e:
            logger.error(f"Daily PDF processing task failed: {e}")
    
    def run_now(self):
        """Run the processing task immediately."""
        logger.info("Running PDF processing task now...")
        self.run_daily_task()
    
    def start_scheduler(self):
        """Start the daily scheduler."""
        logger.info(f"Starting scheduler - will run daily at {self.schedule_time}")
        
        # Schedule daily task
        schedule.every().day.at(self.schedule_time).do(self.run_daily_task)
        
        # Keep running
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            logger.info("Scheduler stopped by user")
        except Exception as e:
            logger.error(f"Scheduler error: {e}")


def main():
    """Main function to run PDF automation."""
    import argparse
    
    parser = argparse.ArgumentParser(description='PDF Automation Workflow')
    parser.add_argument('--input', '-i', default='pdfs', help='Input folder containing PDFs')
    parser.add_argument('--output', '-o', default='merged', help='Output folder for merged PDFs')
    parser.add_argument('--filename', '-f', default='merged.pdf', help='Merged PDF filename')
    parser.add_argument('--time', '-t', default='09:00', help='Daily schedule time (HH:MM)')
    parser.add_argument('--run-now', '-n', action='store_true', help='Run processing now')
    parser.add_argument('--no-cleanup', action='store_true', help='Disable cleanup of old files')
    parser.add_argument('--max-age', type=int, default=7, help='Maximum file age in days')
    
    args = parser.parse_args()
    
    # Create automation instance
    automation = PDFAutomation(
        input_folder=args.input,
        output_folder=args.output,
        merged_filename=args.filename,
        schedule_time=args.time,
        cleanup_old_files=not args.no_cleanup,
        max_file_age_days=args.max_age
    )
    
    if args.run_now:
        # Run processing now
        automation.run_now()
    else:
        # Start scheduler
        automation.start_scheduler()


if __name__ == "__main__":
    main()