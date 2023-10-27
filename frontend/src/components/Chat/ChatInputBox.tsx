import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { socket } from '../../services/socket.js';

const ChatInputBox = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = socket.auth ? socket.auth.email : 'Anonymous';
    if (message.length > 0) {
      socket.emit('chat message', {
        message: message,
        sender: name,
        createdAt: new Date()
      });
      setMessage('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ borderRadius: '1em', display: 'flex' }}
    >
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        value={message}
        onChange={handleChange}
        sx={{ borderRadius: '0.5em', flex: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: '0.5em', marginLeft: '1em' }}
      >
        {' '}
        Send
      </Button>
    </Box>
  );
};

export default ChatInputBox;
