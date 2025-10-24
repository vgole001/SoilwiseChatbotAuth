// src/pages/Dashboard.jsx
import { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { keycloak } from '../utils/keycloak';
import ChatSidebar from '../components/ChatSidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: 'Getting Started',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      title: 'Soil Analysis Question',
      timestamp: 'Yesterday',
    },
  ]);
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your SoilWise assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const userInfo = keycloak.tokenParsed;
  const drawerWidth = 280;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin + '/login'
    });
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewConversation = () => {
    const newId = Math.max(...conversations.map(c => c.id)) + 1;
    const newConv = {
      id: newId,
      title: `New Conversation ${newId}`,
      timestamp: 'Just now',
    };
    setConversations([newConv, ...conversations]);
    setActiveConversation(newId);
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Hello! I\'m your SoilWise assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    // In a real app, you would load messages for this conversation
  };

  const simulateResponse = (userMessage) => {
    // Simulate typing delay
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "Great question! Here's what I can tell you about that...",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newMessage = {
        id: messages.length + 1,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    simulateResponse(content);
  };

return (
  <Box sx={{ display: 'flex', height: '100vh' }}>
    <ChatSidebar
      open={sidebarOpen}
      onToggle={handleToggleSidebar}
      conversations={conversations}
      activeConversation={activeConversation}
      onSelectConversation={handleSelectConversation}
      onNewConversation={handleNewConversation}
      userInfo={userInfo}
      onLogout={handleLogout}
    />

    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box sx={{ 
          width: '100%', 
          maxWidth: 800, 
          mx: 'auto',
          px: 2,
          transform: sidebarOpen ? `translateX(calc(${drawerWidth}px / 2))` : 'translateX(0)',
          transition: 'transform 0.3s',
        }}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Chatbot is pondering hard...
              </Typography>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      <Box sx={{ 
        pb: 3, 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Box sx={{ 
          width: '100%', 
          maxWidth: 800, 
          px: 2,
          transform: sidebarOpen ? `translateX(calc(${drawerWidth}px / 2))` : 'translateX(0)',
          transition: 'transform 0.3s',
        }}>
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </Box>
      </Box>
    </Box>
  </Box>
);
};

export default Dashboard;