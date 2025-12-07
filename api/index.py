from backend.app import app

# Vercel Serverless Function Entry Point
# This exposes the Flask app instance for Vercel to handle requests
app.debug = False
