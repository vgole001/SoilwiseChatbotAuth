// src/components/ChatSidebar.jsx
import { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const ChatSidebar = ({ 
  open, 
  onToggle, 
  conversations, 
  activeConversation, 
  onSelectConversation, 
  onNewConversation,
  userInfo,
  onLogout 
}) => {
  const drawerWidth = 280;
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleUserMenuClose();
    onLogout();
  };

  const userName = userInfo?.preferred_username || userInfo?.email || 'User';
  const userInitials = userName.substring(0, 2).toUpperCase();

  // TODO: Replace with your actual image path
  const logoPath = "/path/to/your/logo.png";

  return (
    <>
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'fixed',
          left: open ? drawerWidth : 0,
          top: 8,
          zIndex: 1300,
          transition: 'left 0.3s',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
      >
        {/* Header with Title and Logo */}
        <Box sx={{ p: 1, pt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
            <Avatar
              src={"/SoilWiseChatbotAvatar.png"}
              alt="SoilWise"
              sx={{
                width: 40,
                height: 40,
                mr: 1.5,
                bgcolor: '#582806ff',
              }}
            >
              SW
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#8B4513' }}>
              SoilWise Chatbot
            </Typography>
          </Box>
          
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onNewConversation}
            sx={{ mb: 2 }}
          >
            New Conversation
          </Button>
          
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, px: 1 }}>
            Recent Conversations
          </Typography>
        </Box>

        <Divider />

        {/* Conversations List */}
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {conversations.map((conv) => (
            <ListItem key={conv.id} disablePadding>
              <ListItemButton
                selected={activeConversation === conv.id}
                onClick={() => onSelectConversation(conv.id)}
              >
                <ChatIcon sx={{ mr: 2, fontSize: 20, color: 'text.secondary' }} />
                <ListItemText
                  primary={conv.title}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: 14,
                  }}
                  secondary={conv.timestamp}
                  secondaryTypographyProps={{
                    fontSize: 12,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* User Info at Bottom */}
        <Box sx={{ p: 2 }}>
          <ListItemButton
            onClick={handleUserMenuClick}
            sx={{
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1.5,
                bgcolor: 'primary.main',
                fontSize: 14,
              }}
            >
              {userInitials}
            </Avatar>
            <ListItemText
              primary={userName}
              primaryTypographyProps={{
                noWrap: true,
                fontSize: 14,
                fontWeight: 500,
              }}
            />
          </ListItemButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled sx={{ opacity: 1 }}>
              <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">{userName}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogoutClick}>
              <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatSidebar;