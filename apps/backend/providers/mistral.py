from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import MISTRAL_API_KEY, MISTRAL_MODEL, StorySize

def chat(system, user, temperature, max_tokens):
    client = MistralClient(api_key=MISTRAL_API_KEY)
    chat_response = client.chat(
        model=MISTRAL_MODEL,
        messages=[
            ChatMessage(
                role="system",
                content=system,
            ),
            ChatMessage(
                role="user",
                content=user,
            ),
        ],
        temperature=temperature,
        max_tokens=max_tokens
    )
    print(chat_response)
    return chat_response.choices[0].message.content