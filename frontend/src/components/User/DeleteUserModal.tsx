import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { supabase } from '../../main';
import { deleteUserAccount } from '../../services/supabaseService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const DeleteUserModal = ({ user, session, open, setOpen }) => {
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    try {
      const token = session.access_token;
      console.log('user', user);
      await deleteUserAccount(user.id as string, token);
      toast.success('Account deleted successfully');
      supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.warn('Error deleting account');
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">
        Confirm Account Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleDeleteAccount} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;
