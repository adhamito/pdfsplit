import requests
import json
import os
from pathlib import Path

# Adjust base path and file path
base_path = Path(__file__).parent.parent
test_pdf = base_path / 'test_document.pdf'

if not test_pdf.exists():
    print(f"Error: Test file not found at {test_pdf}")
    # Try to create a dummy PDF if strictly needed, but better to use existing
    exit(1)

url = 'http://localhost:5000/api/split'
files = {
    'file': ('test_document.pdf', open(test_pdf, 'rb'), 'application/pdf')
}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, files=files)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if result.get('success') and result.get('zip_url'):
            zip_url = result['zip_url']
            print(f"ZIP URL found: {zip_url}")
            
            # Since the server might not be running in this environment context to handle the download request properly 
            # (unless I start it), I mainly want to verify the JSON response contains zip_url.
            # But if the server is running, we can try to download.
            full_url = f"http://localhost:5000{zip_url}"
            print(f"Download URL: {full_url}")
        else:
            print("Error: 'zip_url' not found in success response")
    else:
        print(f"Request failed: {response.text}")

except Exception as e:
    print(f"Error: {e}")
