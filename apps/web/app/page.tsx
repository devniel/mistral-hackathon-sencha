"use client";

import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import { exportToBlob } from "@excalidraw/excalidraw";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { WritingOptionsModal } from "./components/WritingOptionsModal";
import { WrittingVariationsModal } from "./components/WritingVariationsModal";
import { v4 as uuidv4 } from "uuid";


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

  // API Calls
  const sendInitialPrompt = async () => {
    const formData = new FormData();
    //formData.append("promptText", promptText);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sayHello`,
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
        setStories(result.data.stories);
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
  }

  if (loading) {
    return (
      <Box
        position="relative"
        className="min-h-screen min-w-screen"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (false) {
    return (
      <Grid container spacing={2}>
        {/* ROW 1 */}
        {/* COLUMN 1 */}
        <Grid item sm={8}>
          <Grid container spacing={2} mb={1}>
            {/* ITEM */}
            <Grid item sm={12}>
              <Card variant="elevation">
                <Box p={2}>
                  <Typography variant="h2">
                    Clara finds a glowing key, embarks on a magical adventure,
                    and unlocks lost dreams. She returns inspired, opening an
                    art studio, spreading joy.
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        {/* COLUMN 2 */}
        <Grid item sm={4}>
          {/** USED SETTINGS */}
          <Box>
            <Box mb={2}>
              <Chip label="Prompt" size="small" />
              <Typography>Write me a story</Typography>
            </Box>
            <Chip label="Temperature (500)" size="small" />
            <Chip label="Audience (Kids)" size="small" />
          </Box>
          {/** NEW SETTINGS */}
          <Box>
            <WrittingVariationsModal />
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (stories.length) {
    return (
      <Grid container spacing={2}>
        {/* ROW 1 */}
        {/* COLUMN 1 */}
        <Grid item sm={9}>
          <Grid container spacing={2} mb={1}>
            {stories.map((story) => (
              <Grid item sm={4} key={uuidv4()}>
                <Card variant="elevation">
                  <Box p={2}>
                    <Typography variant="h5">{story.story}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* COLUMN 2 */}
        <Grid item sm={3}>
          <Box mb={2}>
            <Chip label="Prompt" size="small" />
            <Typography>{promptText}</Typography>
          </Box>
          <Chip label="Temperature (500)" size="small" />
          <Chip label="Audience (Kids)" size="small" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Box position="relative" className="min-h-scree">
      <Box sx={{ position: "absolute", right: 2, top: 2 }}>
        <Button
          onClick={() => setOpenWrittingOptionsModal(!openWrittingOptionsModal)}
        >
          <AdjustmentsHorizontalIcon width={32} height={32} />
        </Button>
      </Box>
      <textarea
        value={promptText}
        rows={5}
        name="comment"
        id="comment"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Add your comment..."
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
      {openWrittingOptionsModal && <WritingOptionsModal onChange={handleWritingOptionsChange} />}
    </Box>
  );
}
