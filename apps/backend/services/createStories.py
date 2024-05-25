import random
import re
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from constants import MISTRAL_API_KEY, MISTRAL_MODEL, StorySize
    
def parseStories(text):
    story_pattern = re.compile(r"<story>(.*?)</story>", re.DOTALL)
    stories = story_pattern.findall(text)
    stories = [story.strip() for story in stories]
    return stories

def createStories(topic, n_stories=3, temperature=0.7, size=StorySize.SUMMARY, random_seed=random.randint(1, 10000)):
    client = MistralClient(api_key=MISTRAL_API_KEY)
    number_words = int(size.value * 3 / 5)
    chat_response = client.chat(
        model=MISTRAL_MODEL,
        messages=[
            ChatMessage(role="system", content="You're a very gifted storyteller."),
            ChatMessage(
                role="user",
                content="""
                    Propose {n_stories} stories between tags '<story>' '</story>' about {topic} in {number_words} words.
                    Ensure each story has:
                    1. A different setting.
                    2. Unique characters with specific traits.
                    3. Distinct plot twists or endings.
                    Make each story efficient, with vivid imagery, sensory details, profound themes to create captivating atmosphere.
                """.format(
                        topic=topic, number_words=number_words, n_stories=n_stories
                    ),
            ),
        ],
        temperature=temperature,
        random_seed=random_seed,
        max_tokens=3 * size.value,
    )
    return parseStories(chat_response.choices[0].message.content)
