import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Button,
  Box
} from '@mui/material';
import Editor, { OnChange, useMonaco } from '@monaco-editor/react';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { socket } from '../../services/socket.js';
import CodeSubmissionDialog from './CodeSubmissionDialog';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProgrammingLanguages } from '../../constants/enums.js';

const Playground = () => {
  const { theme } = useContext(ThemeContext);
  const monaco = useMonaco();
  const [editorContent, setEditorContent] = useState('# Enter code here');
  const [language, setLanguage] = useState('python');
  const languageOptions = Object.values(ProgrammingLanguages).map((lang) =>
    lang.toLowerCase()
  );
  const [codeSubmitDialogOpen, setCodeSubmitDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for server updates to editor content
    socket.on('updateEditor', (data) => {
      setEditorContent(data.code);
    });

    socket.on('submitCodeSuccess', () => {
      toast('🍬 You Candy Crushed your Interview! 🍬');
      navigate('/');
    });

    socket.on('submitCodeFailure', () => {
      toast.warn('Try submitting Again!');
    });

    return () => {
      socket.off('updateEditor');
      socket.off('submitCodeSuccess');
    };
  }, []);

  const handleEditorChange: OnChange = (newValue) => {
    if (socket) {
      socket.emit('editorChange', {
        code: newValue
      });
    }
  };

  const handleCodeSubmitDialogOpen = () => {
    setCodeSubmitDialogOpen(true);
  };

  const handleCodeSubmit = () => {
    if (socket) {
      socket.emit('submitCode', editorContent);
    }
  };

  const handleSubmitDialogClose = () => {
    setCodeSubmitDialogOpen(false);
  };

  return (
    <>
      <CodeSubmissionDialog
        open={codeSubmitDialogOpen}
        handleCodeSubmit={handleCodeSubmit}
        handleClose={handleSubmitDialogClose}
      />
      <Box sx={{ flex: 1, m: '1em' }}>
        <Stack spacing={2}>
          <FormControl
            sx={{
              minWidth: '50%',
              maxWidth: '100%',
              p: 0,
              m: 0,
              whiteSpace: 'pre-wrap'
            }}
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
          <Box height="75vh" style={{ overflow: 'hidden', flexFlow: 'column' }}>
            <Editor
              height="100%"
              defaultLanguage={language}
              language={language}
              value={editorContent}
              theme={theme === 'light' ? 'hannahLight' : 'hannahDark'}
              onChange={handleEditorChange}
              options={{
                minimap: {
                  enabled: false
                }
              }}
            />
          </Box>
          <Button variant="outlined" onClick={handleCodeSubmitDialogOpen}>
            Submit Code
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Playground;
