from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import OPENAI_API_KEY, OPENAI_MODEL, StorySize
from openai import OpenAI

def chat(system, user, temperature, max_tokens):
    client = OpenAI(api_key=OPENAI_API_KEY)
    chat_response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": system,
            },
            {
                "role": "user",
                "content": user,
            },
        ],
        temperature=temperature,
        max_tokens=max_tokens
    )
    print(chat_response)
    return chat_response.choices[0].message.content