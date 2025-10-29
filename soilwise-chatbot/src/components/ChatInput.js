import { useState, useRef, useEffect } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import { LuSquareArrowUp } from "react-icons/lu";

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Re-focus input after message is sent (when disabled changes from true to false)
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        disabled={disabled}
        variant="standard"
        inputRef={inputRef}
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
        sx={{
          overflow: 'hidden',
          '& .MuiInputBase-root': {
            fontSize: '1rem',
            padding: '7px 0',
          },
        }}
      />
      <IconButton
        type="submit"
        disabled={!message.trim() || disabled}
        sx={{
          bgcolor: '#AF734A',
          color: 'white',
          '&:hover': { bgcolor: '#ad4f11ff' },
          '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
        }}
      >
        <LuSquareArrowUp/>
      </IconButton>
    </Paper>
  );
};

export default ChatInput;