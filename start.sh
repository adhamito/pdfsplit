#!/bin/bash

# PDF Management System Startup Script

set -e

echo "🚀 Starting PDF Management System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    print_error "pip3 is not installed. Please install pip."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p backend/uploads backend/temp frontend/dist scripts/pdfs scripts/merged scripts/logs

# Install Python dependencies
print_status "Installing Python dependencies..."
cd backend
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate || . venv/Scripts/activate 2>/dev/null || true
pip install -r requirements.txt
cd ..

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Install automation dependencies
print_status "Installing automation dependencies..."
cd scripts
pip install -r requirements.txt
cd ..

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file..."
    cp .env.example .env
    print_warning "Please review and update the .env file with your configuration."
fi

# Function to start backend
start_backend() {
    print_status "Starting backend server..."
    cd backend
    source venv/bin/activate || . venv/Scripts/activate 2>/dev/null || true
    python app.py &
    BACKEND_PID=$!
    echo $BACKEND_PID > backend.pid
    cd ..
    print_status "Backend started with PID: $BACKEND_PID"
}

# Function to start frontend
start_frontend() {
    print_status "Starting frontend server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > frontend.pid
    cd ..
    print_status "Frontend started with PID: $FRONTEND_PID"
}

# Function to stop processes
stop_processes() {
    print_status "Stopping services..."
    
    if [ -f "backend.pid" ]; then
        BACKEND_PID=$(cat backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            print_status "Backend stopped"
        fi
        rm -f backend.pid
    fi
    
    if [ -f "frontend.pid" ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            print_status "Frontend stopped"
        fi
        rm -f frontend.pid
    fi
}

# Handle script arguments
case "${1:-start}" in
    start)
        start_backend
        sleep 2
        start_frontend
        print_status "PDF Management System is running!"
        print_status "Frontend: http://localhost:3000"
        print_status "Backend API: http://localhost:5000"
        print_status "Press Ctrl+C to stop"
        
        # Wait for interrupt
        trap stop_processes INT
        wait
        ;;
    
    stop)
        stop_processes
        ;;
    
    restart)
        stop_processes
        sleep 2
        start_backend
        sleep 2
        start_frontend
        print_status "PDF Management System restarted!"
        ;;
    
    build)
        print_status "Building frontend..."
        cd frontend
        npm run build
        cd ..
        print_status "Frontend built successfully!"
        ;;
    
    test)
        print_status "Running tests..."
        cd backend
        source venv/bin/activate || . venv/Scripts/activate 2>/dev/null || true
        python -m pytest tests/ -v
        cd ..
        cd frontend
        npm test
        cd ..
        ;;
    
    *)
        echo "Usage: $0 {start|stop|restart|build|test}"
        echo "  start   - Start the application (default)"
        echo "  stop    - Stop the application"
        echo "  restart - Restart the application"
        echo "  build   - Build the frontend"
        echo "  test    - Run tests"
        exit 1
        ;;
esac