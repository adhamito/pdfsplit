import requests
import json
import os
from pathlib import Path

base_path = Path(r'c:\Users\adham\Desktop\proprojects\spiltpdf')
uploads_path = base_path / 'backend' / 'uploads'

file1 = uploads_path / '7b8abb8b-6ec8-4fad-9ac8-ca5a45f705c3_intelligence-economique-et-competitivite-de-lentreprise-marocaine-quelle-interaction_page_001.pdf'
file2 = uploads_path / '7b8abb8b-6ec8-4fad-9ac8-ca5a45f705c3_intelligence-economique-et-competitivite-de-lentreprise-marocaine-quelle-interaction_page_002.pdf'

if not file1.exists() or not file2.exists():
    print("Error: Test files not found")
    exit(1)

url = 'http://localhost:5000/api/workflow'
files = [
    ('files', ('page1.pdf', open(file1, 'rb'), 'application/pdf')),
    ('files', ('page2.pdf', open(file2, 'rb'), 'application/pdf'))
]

workflow = [
    {
        "id": "step1",
        "type": "merge",
        "name": "Merge PDFs"
    }
]

data = {
    'workflow': json.dumps(workflow)
}

print("Sending request...")
try:
    response = requests.post(url, files=files, data=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        if result.get('success') and result.get('download_urls'):
            download_url = result['download_urls'][0]
            full_url = f"http://localhost:5000{download_url}"
            print(f"Downloading from {full_url}...")
            r = requests.get(full_url)
            if r.status_code == 200:
                with open('downloaded_result.pdf', 'wb') as f:
                    f.write(r.content)
                print("Download successful: downloaded_result.pdf")
            else:
                print(f"Download failed: {r.status_code}")

except Exception as e:
    print(f"Error: {e}")
