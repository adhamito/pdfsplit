@echo off
REM PDF Management System Startup Script for Windows

echo 🚀 Starting PDF Management System...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed. Please install Python 3.8 or higher.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 16 or higher.
    exit /b 1
)

REM Create necessary directories
echo [INFO] Creating necessary directories...
mkdir backend\uploads backend\temp frontend\dist scripts\pdfs scripts\merged scripts\logs 2>nul

REM Install Python dependencies
echo [INFO] Installing Python dependencies...
cd backend
if not exist "venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
cd ..

REM Install Node.js dependencies
echo [INFO] Installing Node.js dependencies...
cd frontend
if not exist "node_modules" (
    npm install
)
cd ..

REM Install automation dependencies
echo [INFO] Installing automation dependencies...
cd scripts
pip install -r requirements.txt
cd ..

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo [INFO] Creating .env file...
    copy .env.example .env
    echo [WARNING] Please review and update the .env file with your configuration.
)

REM Function to start backend
:start_backend
echo [INFO] Starting backend server...
cd backend
call venv\Scripts\activate
start /B python app.py > backend.log 2>&1
echo %errorlevel% > backend.pid
cd ..
echo [INFO] Backend started

REM Function to start frontend
:start_frontend
echo [INFO] Starting frontend server...
cd frontend
start /B npm run dev > frontend.log 2>&1
cd ..
echo [INFO] Frontend started

REM Handle script arguments
if "%1"=="" goto start
goto %1

:start
call :start_backend
timeout /t 2 /nobreak > nul
call :start_frontend
echo [INFO] PDF Management System is running!
echo [INFO] Frontend: http://localhost:3000
echo [INFO] Backend API: http://localhost:5000
echo [INFO] Press Ctrl+C to stop
goto :eof

:stop
echo [INFO] Stopping services...
taskkill /F /IM python.exe 2>nul
taskkill /F /IM node.exe 2>nul
echo [INFO] Services stopped
goto :eof

:restart
call :stop
timeout /t 2 /nobreak > nul
call :start
goto :eof

:build
echo [INFO] Building frontend...
cd frontend
npm run build
cd ..
echo [INFO] Frontend built successfully!
goto :eof

:test
echo [INFO] Running tests...
cd backend
call venv\Scripts\activate
python -m pytest tests/ -v
cd ..
cd frontend
npm test
cd ..
goto :eof

echo Usage: %0 {start|stop|restart|build|test}
echo   start   - Start the application (default)
echo   stop    - Stop the application
echo   restart - Restart the application
echo   build   - Build the frontend
echo   test    - Run tests
goto :eof