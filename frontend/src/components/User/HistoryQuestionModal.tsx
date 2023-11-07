import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ProblemDescription from '../Problems/ProblemDescription';
import { ThemeContext } from '../../contexts/theme-context';
import { Editor } from '@monaco-editor/react';
import { AttemptedQuestionSchema } from '../../services/apiSchema';
import { IconButton, Paper, Stack } from '@mui/material';
import { useContext } from 'react';

interface HistoryQuestionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  question: AttemptedQuestionSchema;
}

function HistoryQuestionModal(props: HistoryQuestionModalProps) {
  const { theme } = useContext(ThemeContext);
  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal open={props.open} onClose={handleClose}>
        <Paper
          elevation={5}
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gap: '20px',
            padding: '20px',
            margin: '50px 50px',
            overflowY: 'auto',
            maxHeight: '90%'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={0.5}
            sx={{
              width: '100%',
              maxWidth: '90vw',
              padding: '0.5em',
              overflowY: 'auto',
              '& > *': {
                flexBasis: '100%',
                flexGrow: 1,
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 64px - 40px)',
                padding: '8px'
              }
            }}
          >
            <Paper elevation={2} sx={{ height: '100%', overflowY: 'auto' }}>
              <ProblemDescription questionId={props.question.id} />
            </Paper>
            <Paper elevation={2} sx={{ height: '100%', overflowY: 'auto' }}>
              <Editor
                value={props.question.code}
                language={props.question.language}
                theme={theme === 'light' ? 'hannahLight' : 'vs-dark'}
                options={{ readOnly: true }}
              />
            </Paper>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}

export default HistoryQuestionModal;
