import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import { user } from '../constants/api/apiSchema';
import { getIdFromUserId, getUser } from '../constants/api/userApi';
import { useState } from 'react';
import { useQuery } from 'react-query';

function EditUserProfile(userId: string) {
  const [Id, setId] = useState<number>(0);

  const {
    data: idData,
    error: idError,
    isLoading: isFetchingId,
    refetch: refetchId
  } = useQuery(['profile'], () => getIdFromUserId(userId), {
    enabled: true,
    retry: 2,
    cacheTime: 0,
    onSuccess(res: number) {},
    onError: (error: any) => {
      console.log(error);
    }
  });

  if (idData) {
    setId(idData);
  } else {
    return <div>Error! {(idError as Error).message}</div>;
  }

  const { data, error, isError, isLoading } = useQuery(
    ['userData', userId],
    () => getUser(Id)
  );

  console.log(data);
  if (isLoading) {
    return <>Questions Loading</>;
  }
  if (isError) {
    return <div>Error! {(error as Error).message}</div>;
  }
  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>Enter Name</FormLabel>
          <TextField></TextField>
          <Button>Submit</Button>
        </FormControl>
      </Box>
    </>
  );
}

export default QuestionTable;
