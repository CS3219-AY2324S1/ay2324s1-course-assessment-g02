import { Button, Typography } from '@mui/material';

export const MatchPageButton = (props: {
  setOpen: (open) => void;
}): JSX.Element => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => props.setOpen(true)}
    >
      <Typography>Find A Match Now</Typography>
    </Button>
  );
};
