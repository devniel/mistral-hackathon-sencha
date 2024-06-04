"use client";

import { ChangeEvent, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Skeleton,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { WritingOptionsModal } from "../components/WritingOptionsModal";
import { WrittingVariationsModal } from "../components/WritingVariationsModal";
import { v4 as uuidv4 } from "uuid";
import {
  AutoFixHigh,
  ChatBubbleOutline,
  Create,
  Info,
  InfoOutlined,
} from "@mui/icons-material";

export default function Page() {
  const [openWrittingOptionsModal, setOpenWrittingOptionsModal] =
    useState(false);

  // Prompt text
  const [promptText, setPromptText] = useState<string>();

  // Prompt settings
  const [storySettings, setStorySettings] = useState<Record<string, any>>();

  // Loading
  const [loading, setLoading] = useState<boolean>();

  // Story Log
  const [log, setLog] = useState([]);

  // Story nodes
  const [storyNodes, setStoryNodes] = useState([]);

  // Stories
  const [stories, setStories] = useState([]);

  const [readStory, setReadStory] = useState(null);

  // API Calls
  const sendInitialPrompt = async () => {
    const formData = new FormData();
    //formData.append("promptText", promptText);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/write`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promptText,
            ...storySettings,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("result:", result);
        setLog([
          ...log,
          {
            id: uuidv4(),
            promptText,
            storySettings,
            stories: result.data.stories,
          },
        ]);
        setLoading(false);
      } else {
        console.error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendPrompt = () => {
    console.log(promptText);
    setOpenWrittingOptionsModal(false);
    setLoading(true);
    sendInitialPrompt();
  };

  const handleWritingOptionsChange = (formValues) => {
    setStorySettings(formValues);
  };

  const handleRead = (story) => {
    setReadStory(story);
  };

  const handleOnToneChange = async (story, tone) => {
    setLoading(true);
    setReadStory(null);
    try {
      const payload = {
        tone,
        promptText: story.promptText,
        story: story.story,
        temperature: story.temperature,
        genre: story.genere,
        total_words: story.total_words,
        language: story.language,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("handleOnToneChange() result :", result);
        setLog([
          ...log,
          {
            id: uuidv4(),
            promptText: payload.promptText,
            storySettings: {
              genere: payload.genre,
              temperature: payload.temperature,
              language: payload.language,
            },
            stories: result.data.stories,
          },
        ]);
        setLoading(false);
      } else {
        console.error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnExtend = async (story) => {
    setLoading(true);
    setReadStory(null);
    try {
      const payload = {
        promptText: story.promptText,
        story: story.story,
        temperature: story.temperature,
        genre: story.genere,
        total_words: story.total_words,
        language: story.language,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/extend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("handleOnExtend() result :", result);
        setLog([
          ...log,
          {
            id: uuidv4(),
            promptText: payload.promptText,
            storySettings: {
              genere: payload.genre,
              temperature: payload.temperature,
              language: payload.language,
            },
            stories: result.data.stories,
          },
        ]);
        setLoading(false);
      } else {
        console.error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnRemix = (story) => {};

  const handleOnSummary = async (story) => {
    setLoading(true);
    setReadStory(null);
    try {
      const payload = {
        promptText: story.promptText,
        story: story.story,
        temperature: story.temperature,
        genre: story.genere,
        total_words: story.total_words,
        language: story.language,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("handleOnSummary() result :", result);
        setLog([
          ...log,
          {
            id: uuidv4(),
            promptText: payload.promptText,
            storySettings: {
              genere: payload.genre,
              temperature: payload.temperature,
              language: payload.language,
            },
            stories: result.data.stories,
          },
        ]);
        setLoading(false);
      } else {
        console.error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnResend = async (story) => {
    setLoading(true);
    setReadStory(null);
    try {
      const payload = {
        promptText: story.promptText,
        temperature: story.temperature,
        genre: story.genere,
        language: story.language,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/write`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("handleOnResend() result :", result);
        setLog([
          ...log,
          {
            id: uuidv4(),
            promptText: payload.promptText,
            storySettings: {
              genere: payload.genre,
              temperature: payload.temperature,
            },
            stories: result.data.stories,
          },
        ]);
        setLoading(false);
      } else {
        console.error("Unexpected error.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [audioUrl, setAudioUrl] = useState<string>();

  const generateAndPlayAudio = async (story) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            story,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error generating audio", error);
    } finally {
    }
  };

  const play = (story) => {
    generateAndPlayAudio(story);
  };

  return (
    <>
      {/** SELECTED STORY */}
      <Modal
        open={readStory}
        onClose={() => {
          setReadStory(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          maxHeight: "100vh",
        }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            {/* ROW 1 */}
            {/* COLUMN 1 */}
            <Grid item sm={2} position="relative">
              {/** USED SETTINGS */}
              <Box position="relative">
                <img
                  src={readStory?.image}
                  style={{ borderRadius: 10, marginBottom: "10px" }}
                />
                <Box mb={2}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    prompt
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {readStory?.promptText}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    summary
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {readStory?.summary}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    total words
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {readStory?.total_words}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    genre
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {readStory?.genre}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    temperature
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {readStory?.temperature}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* COLUMN 2 */}
            <Grid item sm={7}>
              <Grid container spacing={2} mb={1}>
                <Button onClick={() => play(readStory?.story)}>PLAY</Button>
                {/* ITEM */}
                <Grid item sm={12}>
                  <Box p={2} maxHeight="500px" overflow="auto">
                    <Typography variant="h4">{readStory?.story}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/* COLUMN 3 */}
            <Grid
              item
              sm={3}
              position="relative"
              sx={{
                borderLeft: "1px solid rgba(0, 0, 0, .1)",
              }}
            >
              {/** NEW SETTINGS */}
              <Box position="relative">
                <WrittingVariationsModal
                  story={readStory}
                  onToneChange={handleOnToneChange}
                  onExtend={handleOnExtend}
                  onRemix={handleOnRemix}
                  onResend={handleOnResend}
                  onSummary={handleOnSummary}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/** MAIN INPUT */}
      <Box position="relative" className="min-h-scree">
        <Box sx={{ position: "absolute", right: 2, top: 2 }}>
          <Button
            onClick={() =>
              setOpenWrittingOptionsModal(!openWrittingOptionsModal)
            }
          >
            <AdjustmentsHorizontalIcon width={32} height={32} color="green" />
          </Button>
        </Box>
        <textarea
          value={promptText}
          rows={5}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
          placeholder="What will your story be about?"
          defaultValue={""}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.keyCode === 13) {
              sendPrompt();
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setPromptText(e.target.value);
          }}
        ></textarea>
        <WritingOptionsModal
          open={openWrittingOptionsModal}
          onChange={handleWritingOptionsChange}
          onClose={() => setOpenWrittingOptionsModal(false)}
        />
        <Button
        size="small"
        onClick={sendPrompt}
      >
        Generate story
      </Button>
      </Box>
      {/** LOADING VIEW */}
      {loading && (
        <Grid container spacing={2} mt={5}>
          {/* ROW 1 */}
          {/* COLUMN 1 */}
          <Grid item sm={9}>
            <Grid container spacing={2} mb={1}>
              {[null, null, null].map((story) => (
                <Grid item sm={4} key={uuidv4()}>
                  <Card variant="elevation">
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <Skeleton width={100} />
                      </Typography>
                      <Typography variant="h5">
                        <Skeleton height={200} />
                      </Typography>
                    </CardContent>
                    <CardActions
                      disableSpacing
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Skeleton width={100} />
                      </Box>
                      <Skeleton width={50} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
      {/** STORIES LOG */}
      {!!log.length && (
        <Grid container spacing={2} mt={5}>
          {log.toReversed().map((log_entry) => (
            <Box key={log_entry.id} p={2}>
              {/* ROW 1 */}
              <Grid item sm={12} mb={1}>
                <Chip
                  label={log_entry.promptText}
                  variant="outlined"
                  sx={{ opacity: 0.8 }}
                />
              </Grid>
              {/* COLUMN 1 */}
              <Grid item sm={12}>
                <Grid container spacing={2} mb={1}>
                  {log_entry.stories.map((story) => (
                    <Grid item sm={3} key={uuidv4()}>
                      <Card variant="elevation">
                        <CardContent>
                          <img src={story.image} />
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Summary
                          </Typography>
                          <Typography variant="h5">{story.summary}</Typography>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Button
                              size="small"
                              onClick={() => handleRead(story)}
                            >
                              Read more
                            </Button>
                          </Box>
                          <Chip label={`${story.total_words} words`} />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid>
      )}
    </>
  );
}
