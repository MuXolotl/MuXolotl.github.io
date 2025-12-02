import requests
import json
import os

# Список ваших блокнотов
# Ключи (poltrain, polgen) должны совпадать с ID в colab.html (status-poltrain)
NOTEBOOKS = {
    "poltrain": "https://colab.research.google.com/drive/1BiFIyPUdx0u5CWF3YzwKwjgCs_muk6KJ",
    "polgen": "https://colab.research.google.com/drive/1W39tbdYxR1NSVNHG6EDRiKkY4JM0f60B",
    "poluvr": "https://colab.research.google.com/drive/1jS3rYTeNBeLgjJiSG12HdzH8d1kbkFLj"
}

def check_status():
    results = {}
    
    for name, url in NOTEBOOKS.items():
        try:
            # Google Drive ссылки иногда хитрые, но базовый чек на 200/404 работает
            response = requests.get(url, timeout=10)
            
            # Если статус 200 - ссылка жива. 
            # Если 404 или ошибка доступа - вероятно, бан или удаление.
            if response.status_code == 200:
                # Доп. проверка: иногда Google возвращает 200, но пишет "Файл не существует" в HTML
                if "Sorry, the file you have requested does not exist" in response.text:
                    results[name] = "offline"
                    print(f"❌ {name}: File not found (Content check)")
                else:
                    results[name] = "online"
                    print(f"✅ {name}: OK")
            else:
                results[name] = "offline"
                print(f"❌ {name}: Status {response.status_code}")
                
        except Exception as e:
            print(f"⚠️ {name}: Error {e}")
            results[name] = "offline"

    # Сохраняем результат в JSON
    with open('colab-status.json', 'w') as f:
        json.dump(results, f, indent=4)

if __name__ == "__main__":
    check_status()