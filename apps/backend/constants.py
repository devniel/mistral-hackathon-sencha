import os

# Load environment variables from .env file
from dotenv import load_dotenv

load_dotenv()

# OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
MISTRAL_MODEL = "mistral-large-latest"

# Path to the Next.js renderer file
PORT_BACKEND = int(os.getenv('PORT_BACKEND', 5000))

# OpenAI API Headers
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {OPENAI_API_KEY}"
}