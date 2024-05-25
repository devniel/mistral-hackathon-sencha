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

export const WrittingVariationsModal = () => {
  return (
    <Paper elevation={1} className="mt-2 p-5">
      <Box display="flex" flexDirection="column" gap={2}>
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
                <ToggleButton value="android">Strong</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Typography>Remix</Typography>
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
                <ToggleButton value="android">Strong</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Typography>More</Typography>
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
                <ToggleButton value="web">Extend</ToggleButton>
                <ToggleButton value="android">Summary</ToggleButton>
              </ToggleButtonGroup>
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
    </Paper>
  );
};
