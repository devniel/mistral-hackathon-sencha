import base64
import json

def encodeImage(image_bytes):
    return base64.b64encode(image_bytes).decode('utf-8')

def extract_json_content(text):
    # Check if the text contains a JSON block wrapped in "```json" and "```"
    start = text.find("```json")
    if start != -1:
        start += len("```json")
        end = text.find("```", start)
        if end != -1:
            json_content = text[start:end].strip()
            try:
                return json.loads(json_content)
            except json.JSONDecodeError:
                pass
    # If no wrapped JSON block, try to parse as is
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return None    