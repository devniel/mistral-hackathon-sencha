import random
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import MISTRAL_API_KEY, MISTRAL_MODEL, StorySize


def summarizeStory(text, summary_size=StorySize.SUMMARY):
    client = MistralClient(api_key=MISTRAL_API_KEY)
    content = text
    temperature = 0.7
    max_tokens = summary_size.value
    number_words = int(max_tokens * 3 / 4)
    random_seed = random.randint(1, 10000)
    chat_response = client.chat(
        model=MISTRAL_MODEL,
        messages=[
            ChatMessage(
                role="system",
                content="""You're a storyteller pitching your story to have it chosen.""",
            ),
            ChatMessage(
                role="user",
                content=""""Summarize this story : {content} in {number_words}.""".format(
                    content=content, number_words=number_words
                ),
            ),
        ],
        temperature=temperature,
        random_seed=random_seed,
        max_tokens=max_tokens,
    )
    return chat_response.choices[0].message.content
