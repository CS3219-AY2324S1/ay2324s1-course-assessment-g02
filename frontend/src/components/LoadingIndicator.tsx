import { CircularProgress } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

const LoadingIndicator = ({ loading, success }) => {
  if (loading) {
    return (
      <CircularProgress size={50} thickness={3} style={{ margin: '10px' }} />
    );
  } else if (success) {
    return (
      <CheckCircleOutlineRoundedIcon
        fontSize="inherit"
        style={{ width: 80, height: 80, color: '#558B2F', margin: '10px' }}
      />
    );
  } else {
    return (
      <ErrorOutlineRoundedIcon
        fontSize="inherit"
        style={{ width: 80, height: 80, color: '#C62828', margin: '10px' }}
      />
    );
  }
};

export default LoadingIndicator;
