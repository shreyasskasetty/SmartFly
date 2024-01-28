// components/TopNavbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
const TopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to determine the title based on the current path
  const determineTitle = (path) => {
    switch (path) {
      case '/gate-ready/':
        return 'Trips';
      case '/gate-ready/planroute':
        return 'Plan Route';
      case '/gate-ready/timeline':
        return 'Timeline';
      // Add more cases as needed
      default:
        return 'App';
    }
  };

  const title = determineTitle(location.pathname);

  return (
    <AppBar boxShadow={1} elevation={5} position="static" style={{background: 'transparent'}}>
      <Toolbar>
      <img src="/logo1.png" alt="Logo" style={{ marginRight: 10, height: '25px' }} />
        {location.pathname === '/gate-ready/timeline' && (
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ marginLeft: 0 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
