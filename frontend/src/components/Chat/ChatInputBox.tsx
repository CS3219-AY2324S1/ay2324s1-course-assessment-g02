
import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { socket } from '../../socket.js';

const ChatInputBox = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Submitting message: ${message}`);
    console.log(socket.auth)
    const name = socket.auth ? socket.auth.email : 'Anonymous' // should always have a user
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
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        value={message}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </Box>
  );
};

export default ChatInputBox;