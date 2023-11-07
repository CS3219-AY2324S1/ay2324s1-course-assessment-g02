import { Paper, Grid, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditUserModal from './EditUserModal';

const UserProfileContainer = (props: { currentUser: number; userData }) => {
  const userData = props.userData;
  const { id, userName, userPreferredLanguage, userPreferredComplexity } =
    userData.user;
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  console.log(userData);
  const editable =
    props.currentUser === (userData.user.id as number) ? true : false;

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
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
              <Typography gutterBottom variant="subtitle1" component="div">
                Name: {userName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Preferred Programming Language: {userPreferredLanguage}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Preferred Question Complexity: {userPreferredComplexity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {id}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Delete Account
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="edit"
              onClick={() => setEditUserModalOpen(true)}
              disabled={!editable}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfileContainer;
