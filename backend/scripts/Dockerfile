FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    cron \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directories
RUN mkdir -p pdfs merged logs

# Set up cron job for automation
RUN echo "0 9 * * * cd /app && python automation/pdf_automation.py --run-now >> /app/logs/cron.log 2>&1" | crontab -

# Environment variables
ENV PYTHONPATH=/app
ENV INPUT_FOLDER=/app/pdfs
ENV OUTPUT_FOLDER=/app/merged
ENV SCHEDULE_TIME=09:00

# Run cron and automation
CMD ["sh", "-c", "cron && python automation/pdf_automation.py"]