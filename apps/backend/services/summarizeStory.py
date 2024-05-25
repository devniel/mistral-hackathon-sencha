import random
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import MISTRAL_API_KEY, MISTRAL_MODEL, StorySize


def summarizeStory(text, summary_size=StorySize.SUMMARY):
    client = MistralClient(api_key=MISTRAL_API_KEY)
    content = text
    temperature = 0.7
    max_tokens = summary_size.value
    number_words = int(max_tokens * 0.6)

    chat_response = client.chat(
        model=MISTRAL_MODEL,
        messages=[
            ChatMessage(
                role="system",
                content="""You're a very gifted storyteller.""",
            ),
            ChatMessage(
                role="user",
                content="""You want your story : '''{content} ''' to win a contest. Create a summary or an excerpt of this story in less than {number_words} words. Make it captivating and intriguing without giving away spoilers. Focus on conveying the style, main conflict, and unique elements that make the story stand out. Ensure the summary entices readers to want to read the full story.""".format(
                    content=content, number_words=number_words
                ),
            ),
        ],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return chat_response.choices[0].message.content
