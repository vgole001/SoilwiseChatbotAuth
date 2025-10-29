import { Box, Paper, Typography } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  console.log("Rendering message:", message);

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '100%',
        mb: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 0.5,
          bgcolor: isUser ? '#efefef' : 'background.paper',
          maxWidth: '80%',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {/* Icon only*/}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30,
          }}
        >
          {isUser ? (
            <Person />
          ) : (
            <SmartToy sx={{ color: '#AF734A' }} />
          )}
        </Box>

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', flex: 1 }}>
          {message.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;