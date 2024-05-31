import base64
import requests
import os
from constants import STABILITYAI_API_KEY

def generateStoryImage(storySummary):
  url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image"
  body = {
    "steps": 40,
    "width": 512,
    "height": 512,
    "seed": 0,
    "cfg_scale": 5,
    "samples": 1,
    "style_preset": "enhance",
    "text_prompts": [
      {
        "text": storySummary,
        "weight": 1
      },
      {
        "text": "blurry, bad",
        "weight": -1
      }
    ],
  }

  headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": f"Bearer {STABILITYAI_API_KEY}",
  }

  response = requests.post(
    url,
    headers=headers,
    json=body,
  )

  if response.status_code != 200:
      raise Exception("Non-200 response: " + str(response.text))

  data = response.json()
  imageUri = data["artifacts"][0]["base64"]
  return f"data:image/jpeg;base64,{imageUri}"
    
    