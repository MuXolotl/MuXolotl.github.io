import requests
import json

NOTEBOOKS = {
    "poltrain": "https://drive.google.com/file/d/1BiFIyPUdx0u5CWF3YzwKwjgCs_muk6KJ/view",
    "polgen": "https://colab.research.google.com/github/MuXolotl/MuXVS/blob/main/assets/PolGen_Colab.ipynb",
    "poluvr": "https://drive.google.com/file/d/1jS3rYTeNBeLgjJiSG12HdzH8d1kbkFLj/view"
}

def check_status():
    results = {}
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        'Accept-Language': 'en-US,en;q=0.9',
    })
    
    for name, url in NOTEBOOKS.items():
        try:
            response = session.get(url, timeout=15)
            content = response.text.lower()
            
            if response.status_code != 200:
                results[name] = "offline"
                print(f"❌ {name}: HTTP {response.status_code}")
                continue
            
            is_blocked = False
            for pattern in ["in violation of our terms of service"]:
                if pattern in content:
                    is_blocked = True
                    print(f"🚫 {name}: BLOCKED")
                    break
            
            if is_blocked:
                results[name] = "offline"
            else:
                results[name] = "online"
                print(f"✅ {name}: OK")
                
        except Exception as e:
            results[name] = "offline"
            print(f"⚠️ {name}: ERROR - {e}")

    with open('colab-status.json', 'w') as f:
        json.dump(results, f, indent=4)

if __name__ == "__main__":
    check_status()
