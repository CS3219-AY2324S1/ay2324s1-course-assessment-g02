import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { complexityColorMap } from '../../constants/themes';

import { QuestionSchema } from '../../services/apiSchema';
import {
  IconButton,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  Chip,
  Modal
} from '@mui/material';

interface QuestionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  question: QuestionSchema;
}

function QuestionModal(props: QuestionModalProps) {
  const { title, body, categories, complexity } = props.question;
  const handleClose = () => props.setOpen(false);

  const StyledDescription = styled('div')({
    padding: '18.5px 14px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: '8px',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    maxWidth: '100%',
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    },
    '& pre': {
      whiteSpace: 'pre-wrap'
    }
  });

  return (
    <div>
      <Modal open={props.open} onClose={handleClose}>
        <Paper
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gap: '20px',
            padding: '20px',
            margin: '10px 40px',
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

          <Stack direction="row" spacing={1}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Chip
              label={complexity}
              key={complexity}
              variant="outlined"
              sx={{ borderRadius: '12px' }}
              color={complexityColorMap.get(complexity)}
              size="medium"
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            {Object.entries(categories).map(([id, name]) => (
              <Chip
                key={id}
                label={name}
                variant="outlined"
                sx={{ borderRadius: '12px' }}
                size="medium"
              />
            ))}
          </Stack>
          <FormControl>
            <FormLabel>Question Body</FormLabel>

            <StyledDescription
              dangerouslySetInnerHTML={{
                __html: body.replace(/\n\n/g, '')
              }}
            />
          </FormControl>
        </Paper>
      </Modal>
    </div>
  );
}

export default QuestionModal;
