import os

# Load environment variables from .env file
from dotenv import load_dotenv

load_dotenv()

# OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_MODEL = os.getenv('OPENAI_MODEL')
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
MISTRAL_MODEL = "mistral-large-latest"
AI_PROVIDER = os.getenv('AI_PROVIDER', 'openai')
STABILITYAI_API_KEY = os.getenv('STABILITYAI_API_KEY')
ELEVENLABS_API_KEY= os.getenv('ELEVENLABS_API_KEY')
GROQ_API_KEY= os.getenv('GROQ_API_KEY')

# Path to the Next.js renderer file
PORT_BACKEND = int(os.getenv('PORT_BACKEND', 5000))

# OpenAI API Headers
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {OPENAI_API_KEY}"
}

# Define story sizes
# Size in tokens: 100 tokens ~= 75 words
from enum import Enum
class StorySize(Enum):
    HAIKU = 10
    SUMMARY = 30
    VERY_SHORT = 350
    SHORT_STORY = 600
    FULL_STORY = 2000

story_size_mapper = {
    0: StorySize.HAIKU,
    1: StorySize.SUMMARY,
    2: StorySize.VERY_SHORT,
    3: StorySize.SHORT_STORY,
    4: StorySize.FULL_STORY,
}