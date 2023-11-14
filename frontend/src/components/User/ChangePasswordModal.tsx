import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import { updatePassword } from '../../services/supabaseService';
import { toast } from 'react-toastify';

const ChangePasswordModal = ({ open, setOpen, user, session }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePasswords = () => {
    if (!newPassword || !confirmNewPassword) {
      setPasswordError('Password fields cannot be empty');
      return false;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handlePasswordChange = async () => {
    if (!validatePasswords()) {
      return;
    }

    try {
      const token = session.access_token;
      await updatePassword(user.id, confirmNewPassword, token);
      toast('Password changed successfully', { type: 'success' });
      setNewPassword('');
      setConfirmNewPassword('');
      setOpen(false);
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Error changing password');
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handlePasswordChange}>Change</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
