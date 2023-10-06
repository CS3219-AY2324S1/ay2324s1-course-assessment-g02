import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TextField,
  FormGroup,
  Checkbox,
  Box,
  Button,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import MainNavigationBar from '../components/Navbar/MainNavigationBar';
import { useState, useContext, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { UserSchema } from '../constants/api/apiSchema';
import { getUser } from '../constants/api/userApi';
import { useQuery } from 'react-query';
import { ProgrammingLanguages } from '../constants/enums';
import Loading from '../components/Loading';
import { Auth } from '@supabase/auth-ui-react';

const UserProfilePage = (props: { id: number }) => {
  const { user } = Auth.useUser();
  const isLoggedIn = true;

  const [id, setId] = useState<number>(props.id);
  const [userName, setUserName] = useState('');
  const [userPreferredComplexity, setUserPreferredComplexity] = useState('');
  const [userPreferredLanguage, setUserPreferredLanguage] = useState('');
  const [complexity, setComplexity] = useState<string>('Easy');
  const [toggleInputDisabled, setToggleInputDisabled] = useState<boolean>(true);

  const { data, error, isError, isLoading } = useQuery(
    ['userData', id],
    () => getUser(id),
    {
      enabled: true,
      retry: 2,
      cacheTime: 0,
      onSuccess(res: any) {
        setUserName(res.data.username);
        setUserPreferredComplexity(res.data.preferredComplexity);
        setUserPreferredLanguage(res.data.preferredLanguage);
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );

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
      <MainNavigationBar isLoggedIn={isLoggedIn} />
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
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
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
