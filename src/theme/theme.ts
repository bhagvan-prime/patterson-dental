import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#003473',      // Patterson blue
      light: '#4A6FBD',     // Lighter shade for alternating accordions
      dark: '#0D2B6B',      // Darker shade for hover/expanded states
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      primary: '#333333',
      secondary: '#717680',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    grey: {
      100: '#f8f9fa',
      200: '#e9ecef',
    },
  },
  typography: {
     fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
 
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '8px !important',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
  status: {
    danger: '#e53e3e',
  },
});

export default theme;