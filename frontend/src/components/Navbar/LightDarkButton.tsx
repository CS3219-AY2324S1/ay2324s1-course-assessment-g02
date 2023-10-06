import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const LightDarkButton = (props: { theme; setTheme }) => {
  const { theme, setTheme } = props;
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      color="inherit"
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default LightDarkButton;
