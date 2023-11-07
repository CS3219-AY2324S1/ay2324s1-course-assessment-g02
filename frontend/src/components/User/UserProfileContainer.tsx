import { Paper, Grid, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditUserModal from './EditUserModal';

const UserProfileContainer = (props: { currentUser: number; userData }) => {
  const userData = props.userData;
  const { id, userName, userPreferredLanguage, userPreferredComplexity } =
    userData.user;
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const editable =
    props.currentUser === (userData.user.id as number) ? true : false;

  return (
    <Paper
      sx={{
        p: 2,
        minWidth: 400,
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: 'background.paper',
        borderRadius: '16px',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,0.2)',
        '&:hover': {
          boxShadow: '0 6px 12px 0 rgba(0,0,0,0.3)'
        },
        overflow: 'auto' // Scroll overflow
      }}
    >
      <EditUserModal
        id={id}
        open={editUserModalOpen}
        setOpen={setEditUserModalOpen}
        userData={userData}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="text.primary"
                sx={{ fontSize: '1.25rem' }}
              >
                🍬 Name: {userName}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem' }}
              >
                🍭 Preferred Language: {userPreferredLanguage}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: '1rem' }}
              >
                🍡 Preferred Complexity: {userPreferredComplexity}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1rem' }}
              >
                🍬 ID: {id}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ cursor: 'pointer', color: 'secondary.main' }}
                variant="body1"
              >
                🍫 Delete Account
              </Typography>
            </Grid>
          </Grid>
          {editable && (
            <Grid item>
              <IconButton
                aria-label="edit"
                onClick={() => setEditUserModalOpen(true)}
                sx={{
                  color: 'primary'
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfileContainer;
