import { Theme, createTheme } from '@mui/material/styles';
import { Complexity } from '../interfaces/question';

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

export const complexityColorMap = new Map<
  Complexity,
  'success' | 'warning' | 'error'
>([
  [Complexity.Easy, 'success'],
  [Complexity.Medium, 'warning'],
  [Complexity.Hard, 'error']
]);
