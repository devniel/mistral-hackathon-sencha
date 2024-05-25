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
} from "@mui/material";

const storySizes = [
  { value: 0, label: "Haiku", enumValue: "HAIKU" },
  { value: 1, label: "Very Short", enumValue: "SUMMARY" },
  { value: 2, label: "Short", enumValue: "VERY_SHORT" },
  { value: 3, label: "Medium", enumValue: "SHORT_SHORT" },
  { value: 4, label: "Large", enumValue: "FULL_STORY" },
];

export const WritingOptionsModal = ({ onChange }) => {
  const [temperature, setTemperature] = useState(7);
  const [storySize, setStorySize] = useState(storySizes[1].value);
  const [parameter3, setParameter3] = useState(50);
  const [switch1, setSwitch1] = useState(false);
  const [tone, setTone] = useState("web");
  const [audience, setAudience] = useState(10);
  const [genre, setGenre] = useState("fairy tale");
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
    };
    onChange(formValues);
  };

  useEffect(() => {
    handleFormChange();
  }, [temperature, storySize, parameter3, switch1, tone, audience, genre]);

  return (
    <Paper elevation={1} className="mt-2 p-5">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box
          p={2}
          sx={{
            border: "1px solid #eee",
            borderRadius: 2,
          }}
        >
          <Typography mb={2} variant="subtitle2">
            Variants
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Typography>Temperature</Typography>
                </Grid>
                <Grid item sm={9}>
                  <Slider
                    value={temperature}
                    onChange={(e, newValue) => setTemperature(newValue)}
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
                <Grid item sm={3}>
                  <Typography>Size</Typography>
                </Grid>
                <Grid item sm={9}>
                  <Slider
                    value={storySize}
                    onChange={(e, newValue) => setStorySize(newValue)}
                    step={1}
                    marks={storySizes}
                    min={0}
                    max={4}
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Typography>Parameter 3</Typography>
                </Grid>
                <Grid item sm={9}>
                  <Slider
                    value={parameter3}
                    onChange={(e, newValue) => setParameter3(newValue)}
                    aria-label="Parameter 3"
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={100}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Box
          p={2}
          sx={{
            border: "1px solid #eee",
            borderRadius: 2,
          }}
        >
          <Typography mb={2} variant="subtitle2">
            More options
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Typography>Switch 1</Typography>
                </Grid>
                <Grid item sm={9}>
                  <Switch
                    checked={switch1}
                    onChange={(e) => setSwitch1(e.target.checked)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Typography>Tone</Typography>
                </Grid>
                <Grid item sm={9}>
                  <ToggleButtonGroup
                    color="primary"
                    value={tone}
                    exclusive
                    onChange={(e, newTone) => setTone(newTone)}
                    aria-label="Tone"
                  >
                    <ToggleButton value="web">Web</ToggleButton>
                    <ToggleButton value="android">Android</ToggleButton>
                    <ToggleButton value="ios">iOS</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Typography>Audience</Typography>
                </Grid>
                <Grid item sm={9}>
                  <FormControl fullWidth>
                    <Select
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
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
                      <MenuItem value={"fairy tale"}>Fairy tale</MenuItem>
                      <MenuItem value={"folktale"}>Folktale</MenuItem>
                      <MenuItem value={"adventure story"}>
                        Adventure story
                      </MenuItem>
                      <MenuItem value={"humorous story"}>
                        Humorous story
                      </MenuItem>
                      <MenuItem value={"mystery story"}>
                        Mystery story
                      </MenuItem>
                      <MenuItem value={"futuristic story"}>
                        Futuristic story
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
