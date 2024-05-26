import re
from constants import (
    AI_PROVIDER,
    StorySize,
)
from providers import mistral, openai, groq

genre_list = [
    "fairy tale",
    "folktale",
    "fable",
    "adventure story",
    "humorous story",
    "mystery story",
    "futuristic story",
]

genre_characteristics = {
    "fairy tale": "Incorporate elements of magic, moral lessons, and whimsical tone characteristic. ",
    "folktale": "Incorporate typical characters and cultural situations, and maintains a subtlety fitting folktales. ",
    "fable": "Feature anthropomorphized animals, subtely build the plot around a moral, and keeps a simple yet insightful narrative. ",
    "adventure story": "Emphasize the danger obstacles faced along the way, the exploration and quest while keeping the tone suitable for children. ",
    "humorous story": "Use humor, funny situations, entertaining wordplay... to ensure a light-hearted and fun narrative. ",
    "mystery story": "Describe the clues and teamwork they use, with a child-friendly approach and a light and engaging tone. ",
    "futuristic story": "Incorporate futuristic elements, imaginative settings, and technological themes, while maintaining a playful and adventurous tone. ",
}


def parseStories(text):
    story_pattern = re.compile(r"<story>(.*?)</story>", re.DOTALL)
    stories = story_pattern.findall(text)
    stories = [story.strip() for story in stories]
    return stories


def createStories(
    topic,
    n_stories=3,
    temperature=0.7,
    number_words=(StorySize.SUMMARY.value * 0.6),
    genre=None,
    language="english",
):
    client = mistral if AI_PROVIDER == "mistral" else (groq if AI_PROVIDER == "groq" else openai)

    if genre and genre in genre_list:
        additional = genre_characteristics[genre]
    else:
        genre = ""
        additional = ""

    chat_response = client.chat(
        "You're a very gifted storyteller.",
        """
            Propose {n_stories} {genre} stories between tags '<story>' '</story>' about {topic} in {number_words} words for each story.
            Ensure each story has:
            1. A different setting.
            2. Unique characters with specific traits.
            3. Distinct plot twists or endings.
            4. No more than {number_words} words.

            {additional}Make each story efficient, with vivid imagery, sensory details, profound themes to create captivating atmosphere.
            The story should be in {language}
        """.format(
            topic=topic,
            number_words=number_words,
            n_stories=n_stories,
            genre=genre,
            additional=additional,
            language=language
        ),
        temperature=temperature,
        max_tokens=int(number_words * n_stories / 0.6),
    )
    return parseStories(chat_response)
