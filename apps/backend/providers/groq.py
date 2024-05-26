from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import MISTRAL_API_KEY, MISTRAL_MODEL, StorySize, GROQ_API_KEY
from groq import Groq

def chat(system, user, temperature, max_tokens):
    client = MistralClient(api_key=MISTRAL_API_KEY)
    client = Groq(api_key=GROQ_API_KEY)
    chat_response = client.chat.completions.create(
    messages=[
        {"role":"system", "content":system},
        {"role": "user", "content":user}],
    model="mixtral-8x7b-32768",
    temperature=temperature,
    max_tokens=max_tokens)
    return chat_response.choices[0].message.content