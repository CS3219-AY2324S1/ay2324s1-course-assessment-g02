import { Box, Paper, Typography } from '@mui/material';
import { ChatDirections, ChatMessageProps } from './types';
import { formatDateAndTime } from '../../constants/formatDate';

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent:
          props.direction === ChatDirections.left ? 'flex-start' : 'flex-end',
        mb: 2,
        alignItems: 'center',
        padding: '0.5em'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor:
            props.direction === ChatDirections.right
              ? 'primary.light'
              : 'secondary.light',
          borderRadius:
            props.direction === ChatDirections.left
              ? '20px 20px 20px 5px'
              : '20px 20px 5px 20px',
          maxWidth: '70%'
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: '0.6em', color: 'text.primary' }}
        >
          {props.sender}
        </Typography>
        <Typography variant="body2">{props.message}</Typography>
        {props.createdAt && (
          <Typography
            variant="caption"
            sx={{ fontSize: '0.6em', color: 'text.primary' }}
          >
            {formatDateAndTime(new Date(props.createdAt))}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;
