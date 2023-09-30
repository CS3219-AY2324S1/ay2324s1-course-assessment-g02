import { Theme, createTheme } from '@mui/material/styles';

export const hannahTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff84cf'
    },
    secondary: {
      main: '#ecae2a'
    }
  }
});

export const hannahThemeDark: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff84cf'
    },
    secondary: {
      main: '#ecae2a'
    }
  }
});
