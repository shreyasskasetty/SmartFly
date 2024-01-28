import React, { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import {Modal,TextField,List,ListItem, Card, CardContent,Box, Container,Typography,Divider,InputAdornment} from '@mui/material';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { styled, keyframes } from '@mui/system';
import LuggageIcon from '@mui/icons-material/Luggage';
import SecurityIcon from '@mui/icons-material/Security';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { getShopRecommendations } from '../api';
export default function TimelinePage() {
        // Keyframes for icon animation
        const rotate = keyframes`
            0% { transform: rotate(0deg); }
            50% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        `;

        // Styled search icon with animation
        const AnimatedSearchIcon = styled(SearchIcon)`
            animation: ${rotate} 2s infinite ease-in-out;
        `;
        const [modalOpen, setModalOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [recommendations, setRecommendations] = useState([]); 
        const [shopsArray, setShopsArray] = useState([]);// [ { name: 'Starbucks', location: 'Terminal A' }, ... 
        const handleOpenModal = () => {
          setModalOpen(true)
          getShopRecommendations().then(res => {
            console.log(res.rec)
          setShopsArray(Object.entries(res.rec).map(([name, details]) => ({
              name,
              ...details
            })));
          });
        };

        const handleCloseModal = () => setModalOpen(false);

        const handleSearch = (event) => {
            const value = event.target.value;
            setSearchTerm(value);
            // Implement search logic here and update searchResults
        };
      // Modal Style
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: {
          xs: '60%',
          sm: '70%',
          md: '70%',
          lg: '70%',
          xl: '80%'
        },
        bgcolor: 'white', // Background color
        color: '#333', // Text color
        minHeight: '300px', // Minimum height
    };
      // State to track current time
      const [currentTime, setCurrentTime] = useState(new Date());
      const initalItems = [
        {
            time: '10:30 am',
            title: 'Home',
            icon: <HomeIcon />,
            textposition: 'left',
            },
            {
            time: '12:40 pm',
            title: 'Check-in',
            textposition: 'right',
            icon: <LuggageIcon />,
            },
            {
            time: '12:50 pm',
            title: 'TSA',
            textposition: 'left',
            icon: <SecurityIcon />,
            },
      ]

      const [items, setItems] = useState(initalItems);
      const addNewItem = () => {
        const newItem = {
          time: '5:00 am', // Set the time for the new item
          title: 'star bucks',
          textposition: 'right'
        };
        setItems([...items, newItem]);
      };
      
      // Function to determine color based on the item's time
      const getColorForTime = (itemTime) => {
        const today = new Date();
        const itemDateTime = new Date(today.toDateString() + ' ' + itemTime);
        return currentTime >= itemDateTime ? 'primary' : 'grey';
      };
  

  return (
    <Container>
    <Box style={{ height: '500px', overflow: 'auto', padding: '20px' }}> 
        <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', margin: '20px', elevation: 10 }}>
        <CardContent>
            <Timeline position="alternate">
                {items.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            variant="body2"
                            color="white"
                            >
                            {item.time}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                            <TimelineConnector sx={{ height: '40px' }} />
                            <TimelineDot color={getColorForTime(item.time)}>
                                {item.icon ? item.icon : <FastfoodIcon />}
                            </TimelineDot>
                            <TimelineConnector sx={{ height: '40px'}}/>
                            </TimelineSeparator>
                            <TimelineOppositeContent
                                variant="body2"
                                style={{ margin: 'auto 0', textAlign: item.textposition, color: 'white' }}
                                color="white"
                            >
                            {item.title}
                        </TimelineOppositeContent>
                    </TimelineItem>
                ))}
                <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            variant="body2"
                            color="white"
                            >
                            1:00 pm
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                            <TimelineConnector sx={{ height: '40px' }} />
                            <TimelineDot color={getColorForTime('1:00 pm')}>
                                <FlightTakeoffIcon />
                            </TimelineDot>
                            <TimelineConnector sx={{ height: '40px'}}/>
                            </TimelineSeparator>
                            <TimelineOppositeContent
                               variant="body2"
                                style={{ margin: 'auto 0', textAlign: 'right', color: 'white' }}
                                color="white"
                            >
                            Gate
                        </TimelineOppositeContent>
                    </TimelineItem>
            </Timeline>


        </CardContent>
        </Card>
    </Box>
    <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {/* Modal contents */}
          <Typography style={{ textAlign: 'center',margin: 5, variant: "h7" /* ... */}}>
            Shops Near You
          </Typography>
          <Divider /* ... */ />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search shops..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '20px', // Adjust the border radius as needed
                    },
                },
                margin: '20px 0',
                borderRadius: '20px',
                mb: 2,
                input: { color: '#333' },
                bgcolor: '#f5f5f5',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AnimatedSearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Divider sx={{ my: 2 }} />
          <List sx={{ maxHeight: '150px', overflow: 'auto' }}> {/* Scrollable list */}
           {shopsArray.map((shop, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', '&:last-child': { border: 0 } }}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="h6">{shop.name}</Typography>
                            <Typography variant="body2">Shop Type: {shop.shop_type}</Typography>
                            <Typography variant="body2">Distance: {shop.distance.toFixed(2)} miles</Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    <IconButton style={{backgroundColor:'white', width: '40px', height:'40px'}} onClick={handleOpenModal}>
        <AddIcon />
    </IconButton>
    </Container>
  );
}
