import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const LightDarkButton = (props: { theme; toggleTheme }) => {
  const { theme, toggleTheme } = props;
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => toggleTheme()}
      color="inherit"
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default LightDarkButton;
