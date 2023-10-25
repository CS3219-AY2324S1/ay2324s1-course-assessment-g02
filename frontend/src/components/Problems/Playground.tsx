import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack
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
    console.log('received code update');
    socket.on('updateEditor', (data) => {
      setEditorContent(data.code);
    });

    return () => {
      socket.off('updateEditor');
    };
  }, []);

  const handleEditorChange: OnChange = (newValue) => {
    // Emit socket.io event when editor content changes
    if (socket) {
      socket.emit('editorChange', {
        code: newValue
      });
    }
  };

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
            value={editorContent}
            theme={theme == 'light' ? 'light' : 'vs-dark'}
            onChange={handleEditorChange}
          />
        </div>
      </Stack>
    </>
  );
};

export default Playground;
