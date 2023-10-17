import { Paper, Box, Button, Typography, Grid, Modal } from '@mui/material';
import { deleteUser } from '../../constants/api/userApi';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../main';
import { Auth } from '@supabase/auth-ui-react';
import Loading from '../Loading';

interface DeleteUserModalProps {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteUserModal = (props: DeleteUserModalProps) => {
  const handleClose = () => props.setOpen(false);
  const navigate = useNavigate();

  const { user } = Auth.useUser();

  if (!user) return <Loading />;

  const deleteUserAccount = async () => {
    await deleteUser(props.id).then(
      (res) => {
        supabase.auth.signOut();
        console.log('User deleted', res);
        navigate('/');
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        display="flex"
        height={'100vh'}
        width={'100vw'}
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          style={{
            display: 'grid',
            gridRowGap: '20px',
            padding: '40px',
            margin: '10px 200px',
            minWidth: '700px',
            minHeight: '200px'
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">
                Are you sure you want to delete your account?
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <Button onClick={deleteUserAccount}>
                <Typography variant="button">Yes</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleClose}>
                <Typography variant="button">No</Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
