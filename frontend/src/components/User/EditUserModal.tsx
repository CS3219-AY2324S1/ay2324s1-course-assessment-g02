import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Box,
  Button,
  InputLabel,
  Input,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Grid,
  Modal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ProgrammingLanguages } from '../../constants/enums';
import Loading from '../Loading';
import { useState } from 'react';
import { updateUser } from '../../services/user';

interface EditUserModalProps {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  userData;
}

const EditUserModal = (props: EditUserModalProps) => {
  const {
    user,
    isLoading,
    isError,
    setUserName,
    setUserPreferredLanguage,
    setUserPreferredComplexity
  } = props.userData;
  const [tempUserName, setTempUserName] = useState(user.userName);
  const [tempUserPreferredComplexity, setTempUserPreferredComplexity] =
    useState(user.userPreferredComplexity);
  const [tempUserPreferredLanguage, setTempUserPreferredLanguage] = useState(
    user.userPreferredLanguage
  );

  const handleClose = () => props.setOpen(false);

  if (isLoading) {
    return <Loading />;
  }
  const languageOptions = Object.values(ProgrammingLanguages).map((value) => ({
    value,
    label: value
  }));

  const handleUserNameChange = (event) => {
    setTempUserName(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setTempUserPreferredLanguage(event.target.value);
  };

  const handleComplexityChange = (event) => {
    setTempUserPreferredComplexity(event.target.value);
  };

  const updateUserDetails = async () => {
    await updateUser(props.id, {
      username: tempUserName,
      preferredComplexity: tempUserPreferredComplexity,
      preferredLanguage: tempUserPreferredLanguage
    }).then(
      (res) => {
        console.log('User details update successfully', res);
        setUserName(tempUserName);
        setUserPreferredComplexity(tempUserPreferredComplexity);
        setUserPreferredLanguage(tempUserPreferredLanguage);
        props.setOpen(false);
      },
      (error) => {
        console.error('Error updating user details', error);
      }
    );
  };

  return isError ? (
    <>
      <Loading />
    </>
  ) : (
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
            padding: '20px',
            margin: '10px 300px',
            minWidth: '500px',
            minHeight: '500px'
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography variant="h6">User Profile</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              value={tempUserName ? tempUserName : ''}
              placeholder={'Pick a username'}
              onChange={handleUserNameChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Complexity
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={tempUserPreferredComplexity}
              onChange={handleComplexityChange}
              row
            >
              <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
            </RadioGroup>
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel id="dropdown-label">
              Select your preferred programming Language
            </InputLabel>
            <Select
              labelId="dropdown-label"
              id="dropdown"
              value={tempUserPreferredLanguage}
              onChange={handleLanguageChange}
              label="Select an option"
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant={'contained'} onClick={updateUserDetails}>
            Submit
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
