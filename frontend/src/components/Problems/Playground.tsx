import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import Editor from '@monaco-editor/react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/theme-context';

const Playground = () => {

  const { theme } = useContext(ThemeContext);
  const [language, setLanguage] = useState('python');
  const languageOptions = ['python', 'javascript', 'cpp'];

  return (
    <>
      <Stack>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 180 }} size="small">
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={(e: SelectChangeEvent) => setLanguage(e.target.value)}
          >
            {languageOptions.map((lang) => (
              <MenuItem value={lang}>{lang}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ fontSize: 20 }}>
          <Editor
            height="90vh"
            defaultLanguage={language}
            language={language}
            defaultValue="# Enter code here"
            theme={theme == 'light' ? 'light' : 'vs-dark'}
          />
        </div>
      </Stack>
    </>
  );
};

export default Playground;
