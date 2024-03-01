// components/BottomNavbar.js
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BottomNavbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/gate-ready/');
        break;
      case 1:
        navigate('/gate-ready/planroute');
        break;
      // Add more cases if you have more navigation items
    }
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels style={{ backgroundColor: '#1B1B1B', position: 'fixed', bottom: 0, width: '100%' }}>
      <BottomNavigationAction style={{ color: '#E0E0E0'}} label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction style={{ color: '#E0E0E0'}} label="Plan Route" icon={<MapIcon />} />
      {/* Add more navigation actions if needed */}
    </BottomNavigation>
  );
};

export default BottomNavbar;
