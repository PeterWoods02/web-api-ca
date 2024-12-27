import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#bb86fc', 
      contrastText: '#ffffff', 
    },
    secondary: {
      main: '#03dac6', 
    },
    background: {
      default: '#121212', 
      paper: '#1d1d1d', 
    },
    text: {
      primary: '#e1e1e1', 
      secondary: '#b0b0b0', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff', 
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ffffff', 
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#e1e1e1', 
    },
  },
  shadows: [
    'none', 
    '0px 2px 4px rgba(0, 0, 0, 0.2)', 
    '0px 4px 6px rgba(0, 0, 0, 0.3)', 
    '0px 6px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 12px rgba(0, 0, 0, 0.4)',
    '0px 10px 16px rgba(0, 0, 0, 0.5)',
    '0px 12px 18px rgba(0, 0, 0, 0.6)', 
    '0px 14px 20px rgba(0, 0, 0, 0.7)', 
    '0px 16px 24px rgba(0, 0, 0, 0.8)',
   
    
   
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, 
          textTransform: 'none', 
          padding: '10px 20px', 
        },
        containedPrimary: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, 
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', 
          padding: '16px', 
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.6)', 
          },
        },
      },
    },
  },
});

export default theme;
