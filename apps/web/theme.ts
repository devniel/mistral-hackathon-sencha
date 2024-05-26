'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: 'green',
        },
        track: {
          color: 'green',
        },
        rail: {
          color: 'green',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: 'grey.300', // Adjust border color if needed
          '&.Mui-selected': {
            backgroundColor: green[500],
            color: 'white',
            '&:hover': {
              backgroundColor: green[700],
            },
          },
        },
        primary: {
          color: 'green'
        }
      }
    },
  },
});

export default theme;