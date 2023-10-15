
import {
    Box,
    Paper,
    Typography
} from '@mui/material';
import { ChatDirections, ChatMessageProps } from './types';

const ChatMessage = (props: ChatMessageProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: props.direction == ChatDirections.left ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    backgroundColor: props.direction == ChatDirections.left ? "primary.light" : "secondary.light",
                    borderRadius: props.direction == ChatDirections.left ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                }}
            >
                <Typography variant="body1">{props.message}</Typography>
                <Typography variant="body2">{props.sender}</Typography>
                {props.createdAt ? props.createdAt.toString() : ''}
            </Paper>
        </Box>
    );
};

export default ChatMessage;
