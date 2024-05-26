"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { exportToBlob } from "@excalidraw/excalidraw";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import {
  Alert,
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
import { Spa } from "@mui/icons-material";

export const WrittingVariationsModal = ({ story, onToneChange, onSummary, onExtend, onRemix, onResend }) => {
  return (
    <Box className="mt-2 p-5">
      <Box display="flex" flexDirection="column" gap={2}>
        <Alert icon={<Spa/>} severity="success">
          Try a variation for the story, just select one of these options.
        </Alert>

        <Box>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Typography>Tone</Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button variant="outlined" onClick={() => onToneChange(story, 'subtle')}>Sutble</Button>
                <Button variant="outlined" onClick={() => onToneChange(story, 'strong')}>Strong</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Typography>More</Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button variant="outlined" onClick={() => onSummary(story)}>Summary</Button>
                <Button variant="outlined" onClick={() => onExtend(story)}>Extend</Button>
                <Button variant="outlined" onClick={() => onRemix(story)}>Remix</Button>
                <Button variant="outlined" onClick={() => onResend(story)}>Resend</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/*
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
                fullWidth
              >
                <ToggleButton value="web">Subtle</ToggleButton>
                <ToggleButton value="android">Subtle</ToggleButton>
              </ToggleButtonGroup>
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
                fullWidth
              >
                <ToggleButton value="web">Subtle</ToggleButton>
                <ToggleButton value="android">Subtle</ToggleButton>
              </ToggleButtonGroup>
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
                fullWidth
              >
                <ToggleButton value="web">Subtle</ToggleButton>
                <ToggleButton value="android">Subtle</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>
        */}
      </Box>
    </Box>
  );
};
