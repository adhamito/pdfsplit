# PDF Management System

A complete, production-ready PDF management system with Python tools, Flask backend API, React frontend, and automated workflows.

## 🚀 Features

- **PDF Processing Tools**: Merge, split, and validate PDF files
- **Modern Web Interface**: Clean, responsive React frontend with drag & drop
- **RESTful API**: Flask-based backend with comprehensive error handling
- **Automated Workflows**: Daily scheduled PDF processing
- **File Management**: Automatic cleanup and archiving
- **Production Ready**: Docker support, logging, and monitoring

## 📁 Project Structure

```
pdf-management-system/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── uploads/            # Uploaded files storage
│   └── temp/               # Temporary processing files
├── frontend/               # React application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
├── scripts/               # Python tools and automation
│   ├── pdf_tools.py       # Core PDF processing functions
│   ├── automation/        # Automation workflows
│   └── requirements.txt   # Script dependencies
└── docs/                  # Documentation
```

## 🛠️ Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- pip (Python package manager)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pdf-management-system
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Scripts Setup

```bash
cd scripts
pip install -r requirements.txt
```

## 🚀 Running the Application

### Development Mode

1. **Start Backend Server**:
```bash
cd backend
python app.py
```
The backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build Frontend**:
```bash
cd frontend
npm run build
```

2. **Serve with Backend**:
The backend is configured to serve the built frontend files.

## 📋 API Endpoints

### Health Check
- `GET /api/health` - Check backend status

### PDF Operations
- `POST /api/merge` - Merge multiple PDF files
- `POST /api/split` - Split a PDF into individual pages
- `POST /api/validate` - Validate PDF files
- `GET /api/download/{filename}` - Download processed files

### File Management
- `POST /api/cleanup` - Manually trigger cleanup of old files

## 🛠️ Python Tools Usage

### Command Line Interface

```bash
# Merge PDFs
python scripts/pdf_tools.py merge file1.pdf file2.pdf -o merged.pdf

# Split PDF
python scripts/pdf_tools.py split input.pdf -o output_folder

# Validate PDF
python scripts/pdf_tools.py validate file.pdf

# Get PDF Info
python scripts/pdf_tools.py info file.pdf
```

### Python API

```python
from scripts.pdf_tools import PDFTools

# Merge PDFs
result = PDFTools.merge_pdfs(['file1.pdf', 'file2.pdf'])

# Split PDF
pages = PDFTools.split_pdf('input.pdf')

# Validate PDF
is_valid = PDFTools.validate_pdf('file.pdf')

# Get PDF info
info = PDFTools.get_pdf_info('file.pdf')
```

## 🤖 Automation Workflow

### Daily Processing

The automation script can process PDFs from a folder daily:

```bash
# Run automation with default settings
python scripts/automation/pdf_automation.py

# Custom configuration
python scripts/automation/pdf_automation.py \
  --input /path/to/pdfs \
  --output /path/to/merged \
  --time "14:30" \
  --filename "daily_merged.pdf"

# Run once immediately
python scripts/automation/pdf_automation.py --run-now
```

### Features
- Automatic PDF discovery and validation
- Daily scheduled processing
- File archiving after processing
- Automatic cleanup of old files
- Comprehensive logging

## 🎨 Frontend Features

### Design System Integration
- Uses the design system from `https://github.com/dawa-maghreb/design-system`
- Modern, clean UI with consistent styling
- Responsive design for desktop and mobile
- Smooth animations and transitions

### Key Components
- **Drag & Drop Uploader**: Intuitive file upload with validation
- **File Preview**: Real-time file list with size information
- **Progress Indicators**: Visual feedback during processing
- **Error Handling**: User-friendly error messages
- **Download Manager**: Automatic file downloads after processing

## 🔧 Configuration

### Backend Configuration (.env)

```env
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_PORT=5000
MAX_CONTENT_LENGTH=52428800  # 50MB
UPLOAD_FOLDER=uploads
TEMP_FOLDER=temp
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
CLEANUP_MAX_AGE_HOURS=24
```

### Frontend Configuration

The frontend uses Vite for development and building:
- Proxy configuration for API calls
- Path aliases for clean imports
- Hot module replacement for development

## 📊 Monitoring & Logging

### Backend Logging
- Request/response logging
- Error tracking and reporting
- File processing logs
- Cleanup operations logs

### Automation Logging
- Daily processing logs
- File discovery and validation
- Merge/split operation results
- Archive and cleanup activities

## 🐳 Docker Support (Optional)

Create a `docker-compose.yml` for easy deployment:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    volumes:
      - ./uploads:/app/uploads
    environment:
      - FLASK_ENV=production
  
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔒 Security Considerations

- File type validation and sanitization
- File size limits and upload restrictions
- CORS configuration for cross-origin requests
- Secure file naming and storage
- Temporary file cleanup
- Input validation and error handling

## 📈 Performance Optimization

- Efficient PDF processing with PyPDF2
- Temporary file management
- Automatic cleanup of old files
- Optimized file uploads and downloads
- Caching strategies for better performance

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure Flask server is running on port 5000
   - Check firewall settings
   - Verify CORS configuration

2. **PDF Processing Errors**
   - Validate PDF files are not corrupted
   - Check file size limits
   - Ensure sufficient disk space

3. **Frontend Build Issues**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify TypeScript configuration

### Debug Mode

Enable debug logging:
```bash
export FLASK_DEBUG=1
export LOG_LEVEL=DEBUG
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [PyPDF2](https://pypi.org/project/PyPDF2/) for PDF processing
- [Flask](https://flask.palletsprojects.com/) for the web framework
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `/docs` folder
- Review the troubleshooting section

---

**Built with ❤️ for efficient PDF management**