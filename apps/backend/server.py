import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.utils import encodeImage
from services import createStory, summarizeStory, createStories
from constants import PORT_BACKEND, StorySize

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.route("/sayHello", methods=["POST"])
def sayHello():
    logger.info("Received request for /sayHello endpoint")
    try:
        promptText = request.form.get("promptText")
        samples = int(request.form.get("samples", 3))
        stories = createStories(promptText, samples)
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
