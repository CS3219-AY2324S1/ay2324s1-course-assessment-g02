import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

interface CodeSubmissionDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CodeSubmissionDialog = (props: CodeSubmissionDialogProps) => {
  const { open, handleClose } = props;

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        handleClose();
      }, 5555);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="code-submission-dialog-title"
      aria-describedby="code-submission-dialog-description"
    >
      <DialogTitle id="code-submission-dialog-title">
        Code Submission Success
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="code-submission-dialog-description">
          Code submission success! You'll now be redirected to the home page.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
        <Button onClick={handleClose} autoFocus>
          No please don't go
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CodeSubmissionDialog;
