import { Box, Paper, Typography } from '@mui/material';
import { ChatDirections, ChatMessageProps } from './types';

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
        elevation={3} // Add shadow
        sx={{
          p: 2,
          backgroundColor:
            props.direction === ChatDirections.left
              ? 'primary.light'
              : 'secondary.light',
          borderRadius:
            props.direction === ChatDirections.left
              ? '20px 20px 20px 5px'
              : '20px 20px 5px 20px',
          maxWidth: '70%' // Limit message width
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
            {props.createdAt.toString().slice(0, 19)}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ChatMessage;
