from constants import (
    AI_PROVIDER,
    StorySize,
)
from providers import mistral, openai, groq


def summarizeStory(text, number_words, language="english"):
    client = mistral if AI_PROVIDER == "mistral" else (groq if AI_PROVIDER == "groq" else openai)
    content = text
    temperature = 0.7
    max_tokens = int(number_words / 0.6)
    chat_response = client.chat(
        """You're a very gifted storyteller.""",
        """You want your story : '''{content} ''' to win a contest. Create a summary or an excerpt of this story in less than {number_words} words. Make it captivating and intriguing without giving away spoilers. Focus on conveying the style, main conflict, and unique elements that make the story stand out. Ensure the summary entices readers to want to read the full story. The summary should be in {language}""".format(
            content=content, number_words=number_words, language=language
        ),
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return chat_response
