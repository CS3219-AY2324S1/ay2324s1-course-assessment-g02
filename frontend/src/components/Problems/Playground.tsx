import { Stack, Typography } from '@mui/material';
import Editor from '@monaco-editor/react';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';

const Playground = () => {
  // const question: Question = dummyQuestion;

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Stack>
        <Typography variant="h5" gutterBottom component="div">
          Description
        </Typography>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme={theme == 'light' ? 'light' : 'vs-dark'}
        />
        ;
      </Stack>
    </>
  );
};

export default Playground;
