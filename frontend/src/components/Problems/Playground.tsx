import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Paper
} from '@mui/material';
import Editor, { OnChange } from '@monaco-editor/react';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { socket } from '../../services/socket.js';

const Playground = () => {
  const { theme } = useContext(ThemeContext);
  const [editorContent, setEditorContent] = useState('# Enter code here');
  const [language, setLanguage] = useState('python');
  const languageOptions = ['python', 'javascript', 'cpp'];

  useEffect(() => {
    // Listen for server updates to editor content
    socket.on('updateEditor', (data) => {
      setEditorContent(data.code);
    });

    return () => {
      socket.off('updateEditor');
    };
  }, []);

  const handleEditorChange: OnChange = (newValue) => {
    if (socket) {
      socket.emit('editorChange', {
        code: newValue
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: '1em', padding: '1em', height: '100%' }}
    >
      <Stack spacing={2}>
        <FormControl
          sx={{ m: 1, minWidth: '50%', maxWidth: '100%' }}
          size="small"
        >
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={(e: SelectChangeEvent) => setLanguage(e.target.value)}
            sx={{ borderRadius: '0.5em' }}
          >
            {languageOptions.map((lang) => (
              <MenuItem value={lang} key={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ borderRadius: '1em', overflow: 'hidden' }}>
          <Editor
            height="80vh"
            defaultLanguage={language}
            language={language}
            value={editorContent}
            theme={theme === 'light' ? 'light' : 'vs-dark'}
            onChange={handleEditorChange}
          />
        </div>
      </Stack>
    </Paper>
  );
};

export default Playground;
