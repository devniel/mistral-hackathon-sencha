import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Slider,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";

const storySizes = [
  { value: 0, label: "Haiku", enumValue: "HAIKU" },
  { value: 1, label: "Very Short", enumValue: "SUMMARY" },
  { value: 2, label: "Short", enumValue: "VERY_SHORT" },
  { value: 3, label: "Medium", enumValue: "SHORT_SHORT" },
  { value: 4, label: "Large", enumValue: "FULL_STORY" },
];

export const WritingOptionsModal = ({ open, onChange, onClose }) => {
  const [temperature, setTemperature] = useState(7);
  const [storySize, setStorySize] = useState(storySizes[2].value);
  const [parameter3, setParameter3] = useState(50);
  const [switch1, setSwitch1] = useState(false);
  const [tone, setTone] = useState("web");
  const [audience, setAudience] = useState(10);
  const [genre, setGenre] = useState("any");
  const [language, setLanguage] = useState("english");

  const size = storySizes.find((size) => size.value === storySize).enumValue;

  const handleFormChange = () => {
    const formValues = {
      temperature,
      storySize,
      parameter3,
      switch1,
      tone,
      audience,
      genre,
      language
    };
    onChange(formValues);
  };

  useEffect(() => {
    handleFormChange();
  }, [temperature, storySize, parameter3, switch1, tone, audience, genre, language]);

  useEffect(() => {
    handleFormChange();
  }, []);

  return (
    <Paper
      elevation={1}
      className="mt-2 p-5"
      sx={{
        width: "100%",
        display: open ? "block" : "none",
        position: "absolute",
        zIndex: 3,
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <Typography>Creativity</Typography>
              </Grid>
              <Grid item sm={9}>
                <Slider
                  value={temperature}
                  onChange={(e, newValue) => setTemperature(newValue as any)}
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={10}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                sm={3}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography>Size</Typography>
              </Grid>
              <Grid item sm={9}>
                <ToggleButtonGroup
                  fullWidth
                  color="primary"
                  value={storySize}
                  exclusive
                  onChange={(e, size) => setStorySize(size)}
                  aria-label="Size"
                >
                  <ToggleButton value={0}>XS</ToggleButton>
                  <ToggleButton value={1}>S</ToggleButton>
                  <ToggleButton value={2}>M</ToggleButton>
                  <ToggleButton value={3}>L</ToggleButton>
                  <ToggleButton value={4}>XL</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>
          {/** GENRE */}
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <Typography>Genre</Typography>
              </Grid>
              <Grid item sm={9}>
                <FormControl fullWidth>
                  <Select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <MenuItem value={"any"}>any</MenuItem>
                    <MenuItem value={"fairy tale"}>Fairy tale</MenuItem>
                    <MenuItem value={"folktale"}>Folktale</MenuItem>
                    <MenuItem value={"adventure story"}>
                      Adventure story
                    </MenuItem>
                    <MenuItem value={"humorous story"}>Humorous story</MenuItem>
                    <MenuItem value={"mystery story"}>Mystery story</MenuItem>
                    <MenuItem value={"futuristic story"}>
                      Futuristic story
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          {/** LANGUAGE */}
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={3}>
                <Typography>Language</Typography>
              </Grid>
              <Grid item sm={9}>
                <FormControl fullWidth>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <MenuItem value={"english"}>English</MenuItem>
                    <MenuItem value={"french"}>French</MenuItem>
                    <MenuItem value={"spanish"}>Spanish</MenuItem>
                    <MenuItem value={"german"}>German</MenuItem>
                    <MenuItem value={"italian"}>Italian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
