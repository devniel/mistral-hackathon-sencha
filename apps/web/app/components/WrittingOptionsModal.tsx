"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { exportToBlob } from "@excalidraw/excalidraw";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
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

const storySizes = [
  { value: 0, label: 'Very Short', enumValue: 'VERY_SHORT' },
  { value: 1, label: 'Short', enumValue: 'SHORT_STORY' },
  { value: 2, label: 'Medium', enumValue: 'MEDIUM_STORY' },
  { value: 3, label: 'Large', enumValue: 'FULL_STORY' },
];


export const WrittingOptionsModal = () => {
  const [storySize, setStorySize] = useState(storySizes[1].value);
  const size = storySizes.find(size => size.value === storySize).enumValue;

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
                    defaultValue={50}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item sm={3}>
                  <Typography>Parameter 2</Typography>
                </Grid>
                <Grid item sm={9}>
                  <Slider
                    value={storySize}
                    onChange={(e, newValue) => setStorySize(newValue)}
                    step={1}
                    marks={storySizes}
                    min={0}
                    max={3}
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
                    defaultValue={50}
                    aria-label="Default"
                    valueLabelDisplay="auto"
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
                  <Switch />
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
                    value="web"
                    exclusive
                    onChange={() => {}}
                    aria-label="Platform"
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
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={10}
                      label="Age"
                      onChange={() => {}}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
