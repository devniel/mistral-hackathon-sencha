import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.utils import encodeImage
from services import createStory, summarizeStory, createStories
from constants import PORT_BACKEND, StorySize, story_size_mapper

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.route("/sayHello", methods=["POST"])
def sayHello():
    logger.info("Received request for /sayHello endpoint")
    try:
        data = request.get_json()
        promptText = data.get("promptText")
        samples = int(data.get("samples", 3))
        temperature = float(data.get("temperature", 0.7))/10
        story_size = story_size_mapper.get(int(data.get("storySize", 1)), StorySize.SUMMARY)
        parameter3 = data.get("parameter3")
        switch1 = data.get("switch1")
        tone = data.get("tone")
        audience = data.get("audience")        
        stories = createStories(promptText, samples, temperature, size=story_size)
        stories_with_summaries = []
        for story in stories:
            summary = summarizeStory(story, StorySize.SUMMARY)
            stories_with_summaries.append(
                {"story": story, "summary": summary, "prompText": promptText}
            )
        return jsonify({"data": {"stories": stories_with_summaries}})
    except Exception as e:
        logger.error(f"Error processing the image: {e}")
        return jsonify({"error": "Failed to process the image"}), 500


if __name__ == "__main__":
    logger.info(f"Starting backend server on port {PORT_BACKEND}")
    app.run(host="0.0.0.0", port=PORT_BACKEND)
