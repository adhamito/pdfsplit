import requests
import os
import sys

BASE_URL = 'http://localhost:5000/api'
TEST_FILE = 'backend/test_document.pdf'

def test_compress():
    print("\nTesting Compress PDF...")
    if not os.path.exists(TEST_FILE):
        print(f"Error: Test file {TEST_FILE} not found")
        return

    files = {'file': open(TEST_FILE, 'rb')}
    try:
        response = requests.post(f'{BASE_URL}/compress', files=files)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("Response:", result)
            if result.get('success'):
                download_url = result['download_url']
                print(f"Downloading from {download_url}...")
                r = requests.get(f"http://localhost:5000{download_url}")
                if r.status_code == 200:
                    with open('compressed_result.pdf', 'wb') as f:
                        f.write(r.content)
                    print("Download successful: compressed_result.pdf")
                    
                    # Compare sizes
                    original_size = os.path.getsize(TEST_FILE)
                    new_size = os.path.getsize('compressed_result.pdf')
                    print(f"Original Size: {original_size} bytes")
                    print(f"Compressed Size: {new_size} bytes")
                else:
                    print(f"Download failed: {r.status_code}")
        else:
            print("Compress failed:", response.text)
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        files['file'].close()

if __name__ == '__main__':
    test_compress()
