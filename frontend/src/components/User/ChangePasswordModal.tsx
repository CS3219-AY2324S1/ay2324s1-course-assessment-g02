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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async () => {
    try {
      const token = session.access_token;
      await updatePassword(user.id, newPassword, token);
      toast.success('Password changed successfully');
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
          label="Current Password"
          type="password"
          fullWidth
          variant="outlined"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
