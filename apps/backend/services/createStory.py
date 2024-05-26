import random
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import MISTRAL_API_KEY, MISTRAL_MODEL, StorySize

def createStory(text):
    client = MistralClient(api_key=MISTRAL_API_KEY)
    n_answers = 10
    # Size in tokens: 100 tokens ~= 75 words
    haiku = 30
    summary_size = StorySize.SUMMARY
    very_short = 350
    short_story = 600
    full_story = 2000
    content = text
    temperature = 0.7
    max_tokens= summary_size
    number_words = int(max_tokens * 3 /4)
    random_seed = random.randint(1, 10000)
    chat_response = client.chat(
        model=MISTRAL_MODEL,
        messages=[
            ChatMessage(role="system", content = """You're a storyteller who offers some child stories. You have a warm voice."""),
            ChatMessage(role="user", content = """Create stories about {content} in {number_words}.""".format(content=content, number_words=number_words))
        ],
        temperature=temperature,
        random_seed=random_seed,
        max_tokens=max_tokens
    )
    return chat_response.choices[0].message.content