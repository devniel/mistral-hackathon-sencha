from constants import (
    AI_PROVIDER,
    StorySize,
)
from providers import mistral, openai, groq


def toneStory(story, tone, number_words, language="english"):
    client = mistral if AI_PROVIDER == "mistral" else (groq if AI_PROVIDER == "groq" else openai)
    content = story
    temperature = 0.7
    max_tokens = int(number_words / 0.6)
    chat_response = client.chat(
        """You're a very gifted storyteller.""",
        """Do a {tone} tone change on the following story : '''{content} ''' in less than {number_words} words. Make it captivating and intriguing without giving away spoilers. Focus on conveying the style, main conflict, and unique elements that make the story stand out. Ensure the story entices readers to want to read the full story. The story should be in {language}""".format(
            content=content, number_words=number_words, tone=tone, language=language
        ),
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return chat_response
