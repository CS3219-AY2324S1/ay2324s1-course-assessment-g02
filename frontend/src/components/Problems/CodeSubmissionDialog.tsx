import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CodeSubmissionDialogProps {
  open: boolean;
  handleCodeSubmit: () => void;
  handleClose: () => void;
}

const CodeSubmissionDialog = (props: CodeSubmissionDialogProps) => {
  const { open, handleClose, handleCodeSubmit } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="code-submission-dialog-title"
      aria-describedby="code-submission-dialog-description"
    >
      <DialogTitle id="code-submission-dialog-title">
        Confirm Submission
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="code-submission-dialog-description">
          Would you like to confirm your submission?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCodeSubmit} autoFocus>
          Yes I am done
        </Button>
        <Button onClick={handleClose} autoFocus>
          Not yet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CodeSubmissionDialog;
