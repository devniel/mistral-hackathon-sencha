import logging
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from utils.utils import encodeImage
from services import (
    createStory,
    summarizeStory,
    createStories,
    extendStory,
    toneStory,
    generateStoryImage,
)
from constants import PORT_BACKEND, StorySize, story_size_mapper, ELEVENLABS_API_KEY
import tempfile
from elevenlabs.client import ElevenLabs
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def count_words(text):
    # Remove punctuation from the text and count words
    text = text.lower()
    text = "".join(char for char in text if char.isalnum() or char.isspace())
    word_count = len(text.split())
    return word_count


@app.route("/write", methods=["POST"])
def write():
    logger.info("Received request for /write endpoint")
    try:
        data = request.get_json()
        promptText = data.get("promptText")
        samples = int(data.get("samples", 3))
        temperature = float(data.get("temperature", 0.7)) / 10
        story_size = story_size_mapper.get(
            int(data.get("storySize", 1)), StorySize.SUMMARY
        ).value
        parameter3 = data.get("parameter3")
        switch1 = data.get("switch1")
        tone = data.get("tone")
        audience = data.get("audience")
        genre = data.get("genre", None)
        language = data.get("language")
        stories = createStories(
            promptText,
            samples,
            temperature,
            number_words=int(story_size * 0.6),
            genre=genre,
            language=language,
        )
        stories_with_summaries = []
        for story in stories:
            summary = summarizeStory(
                story, int(StorySize.SUMMARY.value * 0.6), language
            )

            if language != "english":
                summary_en = summarizeStory(
                    story, int(StorySize.SUMMARY.value * 0.6), "english"
                )
                image = generateStoryImage(summary_en)
            else:
                image = generateStoryImage(summary)

            stories_with_summaries.append(
                {
                    "story": story,
                    "summary": summary,
                    "total_words": count_words(story),
                    "promptText": promptText,
                    "samples": samples,
                    "temperature": temperature * 10,
                    "story_size": int(data.get("storySize", 1)),
                    "parameter3": parameter3,
                    "switch1": switch1,
                    "tone": tone,
                    "audience": audience,
                    "genre": genre,
                    "image": image,
                    "language": language,
                }
            )
        return jsonify({"data": {"stories": stories_with_summaries}})
    except Exception as e:
        logger.error(f"Error processing the request for /write: {e}")
        return jsonify({"error": "Error processing the request for /write"}), 500


@app.route("/extend", methods=["POST"])
def extend():
    logger.info("Received request for /extend endpoint")
    try:
        data = request.get_json()
        promptText = "extend the story"
        samples = int(data.get("samples", 3))
        story = data.get("story")
        total_words = int(data.get("total_words", 0))
        temperature = float(data.get("temperature", 0.7)) / 10
        story_size = story_size_mapper.get(
            int(data.get("storySize", 1)), StorySize.SUMMARY
        )
        parameter3 = data.get("parameter3")
        switch1 = data.get("switch1")
        tone = data.get("tone")
        audience = data.get("audience")
        genre = data.get("genre", None)
        language = data.get("language")
        results = []
        for i in range(samples):
            extended = extendStory(story, total_words * 1.8)
            extended_summarized = summarizeStory(
                extended, StorySize.SUMMARY.value, language
            )

            if language != "english":
                summary_en = summarizeStory(
                    extended, StorySize.SUMMARY.value, "english"
                )
                image = generateStoryImage(summary_en)
            else:
                image = generateStoryImage(extended_summarized)

            results.append(
                {
                    "story": extended,
                    "summary": extended_summarized,
                    "total_words": count_words(extended),
                    "promptText": promptText,
                    "samples": samples,
                    "temperature": temperature * 10,
                    "story_size": int(data.get("storySize", 1)),
                    "parameter3": parameter3,
                    "switch1": switch1,
                    "tone": tone,
                    "audience": audience,
                    "genre": genre,
                    "image": image,
                    "language": language,
                }
            )
        return jsonify({"data": {"stories": results}})
    except Exception as e:
        logger.error(f"Error processing request for /extend: {e}")
        return jsonify({"error": "Error processing request for /extend"}), 500


@app.route("/tone", methods=["POST"])
def tone():
    logger.info("Received request for /tone endpoint")
    try:
        data = request.get_json()
        tone = data.get("tone")
        promptText = f"do a {tone} change of the tone of the story"
        samples = int(data.get("samples", 3))
        story = data.get("story")
        total_words = int(data.get("total_words", 0))
        temperature = float(data.get("temperature", 0.7)) / 10
        story_size = story_size_mapper.get(
            int(data.get("storySize", 1)), StorySize.SUMMARY
        )
        parameter3 = data.get("parameter3")
        switch1 = data.get("switch1")
        audience = data.get("audience")
        genre = data.get("genre", None)
        language = data.get("language")
        results = []
        for i in range(samples):
            updated = toneStory(story, tone, total_words, language)
            updated_summarized = summarizeStory(
                updated, StorySize.SUMMARY.value, language
            )

            if language != "english":
                summary_en = summarizeStory(updated, StorySize.SUMMARY.value, "english")
                image = generateStoryImage(summary_en)
            else:
                image = generateStoryImage(updated_summarized)

            results.append(
                {
                    "story": updated,
                    "summary": updated_summarized,
                    "total_words": count_words(updated),
                    "promptText": promptText,
                    "samples": samples,
                    "temperature": temperature * 10,
                    "story_size": int(data.get("storySize", 1)),
                    "parameter3": parameter3,
                    "switch1": switch1,
                    "tone": tone,
                    "audience": audience,
                    "genre": genre,
                    "image": image,
                    "language": language,
                }
            )
        return jsonify({"data": {"stories": results}})
    except Exception as e:
        logger.error(f"Error processing request for /tone: {e}")
        return jsonify({"error": "Error processing request for /tone"}), 500


@app.route("/summary", methods=["POST"])
def summary():
    logger.info("Received request for /summary endpoint")
    try:
        data = request.get_json()
        tone = data.get("tone")
        promptText = f"do a summary of the story"
        samples = int(data.get("samples", 3))
        story = data.get("story")
        total_words = int(data.get("total_words", 0))
        temperature = float(data.get("temperature", 0.7)) / 10
        story_size = story_size_mapper.get(
            int(data.get("storySize", 1)), StorySize.SUMMARY
        )
        parameter3 = data.get("parameter3")
        switch1 = data.get("switch1")
        audience = data.get("audience")
        genre = data.get("genre", None)
        language = data.get("language")
        results = []
        for i in range(samples):
            summarized = summarizeStory(story, total_words * 0.5, language)

            if language != "english":
                summary_en = summarizeStory(story, total_words * 0.5, "english")
                image = generateStoryImage(summary_en)
            else:
                image = generateStoryImage(summarized)

            results.append(
                {
                    "story": summarized,
                    "summary": summarized,
                    "total_words": count_words(summarized),
                    "promptText": promptText,
                    "samples": samples,
                    "temperature": temperature * 10,
                    "story_size": int(data.get("storySize", 1)),
                    "parameter3": parameter3,
                    "switch1": switch1,
                    "tone": tone,
                    "audience": audience,
                    "genre": genre,
                    "image": image,
                    "language": language,
                }
            )
        return jsonify({"data": {"stories": results}})
    except Exception as e:
        logger.error(f"Error processing the request for /summary: {e}")
        return jsonify({"error": "Error processing the request for /summary"}), 500


@app.route("/audio", methods=["POST"])
def generate_audio():
    data = request.json
    text_to_generate = data.get("story")

    if not text_to_generate:
        return jsonify({"error": "No text provided"}), 400

    try:
        client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
        audio_generator = client.generate(
            text=text_to_generate,
            # voice="Rachel",
            voice_id="ZjNDpMjI2dFTWugLRT4G",
            model="eleven_multilingual_v2",
        )

        # Convert the generator output to bytes
        audio_bytes = BytesIO()
        for chunk in audio_generator:
            audio_bytes.write(chunk)
        audio_bytes.seek(0)

        # Create a temporary file to save the audio data
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        temp_file.write(audio_bytes.read())
        temp_file.close()

        # Send the file to the client
        return send_file(
            temp_file.name,
            as_attachment=True,
            download_name="generated_audio.mp3",
            mimetype="audio/mpeg",
        )

    except Exception as e:
        return jsonify({"error": "Error processing the request for /audio", "details": str(e)}), 500


if __name__ == "__main__":
    logger.info(f"Starting backend server on port {PORT_BACKEND}")
    app.run(host="0.0.0.0", port=PORT_BACKEND)
