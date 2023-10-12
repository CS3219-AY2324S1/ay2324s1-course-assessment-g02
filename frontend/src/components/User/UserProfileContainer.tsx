import { Paper, Grid, ButtonBase, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import useUserData from './useUserData';
import EditIcon from '@mui/icons-material/Edit';
import EditUserModal from './EditUserModal';
import NotFound from '../NotFound';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

const UserProfileContainer = (props: { id: number; currentUser: number }) => {
  // shift to useUserData in the future after implementing, wishful thinking for now
  const [userImageSrc, setUserImageSrc] = useState('');
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const editable = props.currentUser === (props.id as number) ? true : false;

  const userData = useUserData(props.id as number);
  const { userName, userPreferredComplexity, userPreferredLanguage, isError } =
    userData;

  return isError ? (
    <NotFound />
  ) : (
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
        id={props.id}
        open={editUserModalOpen}
        setOpen={setEditUserModalOpen}
        userData={userData}
      />
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={userImageSrc} />
          </ButtonBase>
        </Grid>
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
                ID: {props.id}
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
