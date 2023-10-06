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
  CssBaseline,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { getUser } from '../../constants/api/userApi';
import { useQuery } from 'react-query';
import { ProgrammingLanguages } from '../../constants/enums';
import Loading from '../Loading';

const useUserData = (id: number) => {
  const [userName, setUserName] = useState('');
  const [userPreferredComplexity, setUserPreferredComplexity] = useState('');
  const [userPreferredLanguage, setUserPreferredLanguage] = useState('');

  const { isError, isLoading } = useQuery(['userData', id], () => getUser(id), {
    enabled: true,
    retry: 2,
    cacheTime: 0,
    onSuccess(res) {
      setUserName(res.data.username);
      setUserPreferredComplexity(res.data.preferredComplexity);
      setUserPreferredLanguage(res.data.preferredLanguage);
      console.log(res.data.preferredLanguage);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return {
    userName,
    userPreferredComplexity,
    userPreferredLanguage,
    isLoading,
    isError,
    setUserPreferredLanguage,
    setUserPreferredComplexity
  };
};

const UserProfilePage = (props: { id: number }) => {
  const {
    userName,
    userPreferredComplexity,
    userPreferredLanguage,
    isLoading,
    isError,
    setUserPreferredLanguage,
    setUserPreferredComplexity
  } = useUserData(props.id);

  const updateUser = () => {
    return;
  };

  if (isLoading) {
    return <Loading />;
  }

  const languageOptions = Object.values(ProgrammingLanguages).map((value) => ({
    value,
    label: value
  }));

  const handleLanguageChange = (event) => {
    setUserPreferredLanguage(event.target.value);
  };

  return isError ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      <CssBaseline />
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
          <Typography variant="h6">User Profile</Typography>

          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              value={userName ? userName : ''}
              placeholder={'Pick a username'}
              // Shall enable this next time
              // disabled={toggleInputDisabled}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Complexity
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={userPreferredComplexity}
              onChange={(e) => setUserPreferredComplexity(e.target.value)}
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
              value={userPreferredLanguage}
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

          <Button variant={'contained'} onClick={updateUser}>
            Submit
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfilePage;
