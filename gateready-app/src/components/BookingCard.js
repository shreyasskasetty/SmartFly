import React, {useEffect} from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, Stack, Divider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { fetchFlightDetails, getTotalDuration} from '../api';
import { timeStringToMinutes, getCurrentTime} from '../utils';
const BookingCard = () => {
    const [bookingDetails, setBookingDetails] = React.useState({
        fromCity: 'NA',
        fromCode: 'NA',
        toCity: 'NA',
        toCode: 'NA',
        departTime: 'NA',
        flightNumber: 'NA',
        price: '$0',
        totaltripduration: '0' 
    });
    const [totalAvailableTime, setTotalAvailableTime] = React.useState(0);
    const [totalDuration, setTotalDuration] = React.useState(null);
      useEffect(() => {
        fetchFlightDetails().then(data => {
          setBookingDetails(data);
          setTotalAvailableTime(timeStringToMinutes(data.departTime) - getCurrentTime())
      }).catch(error => {
          console.error('Error fetching flight details:', error);
      });

        const fetchData = async () => {
          try {
             // Fetch total duration
              const origin = "30.625987905694814, -96.33400000000001"
              const destination = "29.985573335353482, -95.33332464290393"
              const duration = await getTotalDuration(origin, destination);
              setTotalDuration(duration);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();

      // Set up the poller for total duration
      const intervalId = setInterval(async () => {
          try {
            const origin = "30.625987905694814, -96.33400000000001"
              const destination = "29.985573335353482, -95.33332464290393"
              const duration = await getTotalDuration(origin, destination);
              setTotalDuration(duration);
          } catch (error) {
              console.error('Error fetching total duration:', error);
          }
      }, 30000); // 300000 ms = 5 minutes

      return () => clearInterval(intervalId);
    }, []);

    return (
        <Card sx={{ bgcolor: '#2B2B2B',
        color: '#FFF',
        minWidth: { xs: 400, sm: 500, md: 600 },
        maxWidth: { xs: '100%', sm: '100%', md: 600 },  }}>
        <CardContent>
        <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip size="sm" style={{width:'100px', height:'20px', backgroundColor:'rgb(223,223,224,0.3)', color:'white'}} variant="soft">
         On Time
        </Chip>
        <Chip size="sm" variant="soft">
          Figma
        </Chip>
      </Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" component="div" sx={{ color: 'teal' }}>
                {bookingDetails? bookingDetails.fromCity: null} ({bookingDetails?bookingDetails.fromCode: null})
              </Typography>
              <Typography variant="h8" color="white">
                Depart
              </Typography>
              <Typography variant="body2" component="div">
                {bookingDetails? bookingDetails.departTime: null}
              </Typography>
            </Box>
            <Box>
              <img src="/logo1.png" alt="Emirates" style={{ height: '20px' }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" component="div" sx={{ color: 'teal' }}>
                {bookingDetails? bookingDetails.toCity: null} ({bookingDetails?bookingDetails.toCode: null})
              </Typography>
              <Typography variant="h8" color="white">
                Flight
              </Typography>
              <Typography variant="body2" component="div">
                {bookingDetails? bookingDetails.flightNumber: null}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ my: 2, bgcolor: 'grey' }} />
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'absolute', left: 0 }}>
                <FiberManualRecordIcon color="white" />
            </Box>
            <FlightIcon sx={{zIndex: 1, transform: 'rotate(90deg)' }} /> {/* Rotated flight icon */}
            <Box sx={{ position: 'absolute', right: 0 }}>
                <FiberManualRecordIcon color="white" />
            </Box>
            <Box sx={{ width: '80%', height: '2px', bgcolor: 'grey', position: 'absolute' }} />
            </Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h8" component="div" color="error">
                {bookingDetails? bookingDetails.price: null}
                </Typography>
                <Typography variant="body2" sx={{ alignSelf: 'flex-end' }}>
                {totalDuration? totalDuration:null}
                </Typography>
            </Stack>
            <Box>
                <Typography variant="body2" color="white">
                  Start Trip in {totalDuration & totalAvailableTime? (totalAvailableTime - totalDuration) < 60?(totalAvailableTime - totalDuration)+'min':(totalAvailableTime - totalDuration)/60+'hr':null} 
                </Typography>
            </Box>
          <Button 
            variant="contained" 
            sx={{ mt: 2, bgcolor: 'teal', ':hover': { bgcolor: 'green' } }}
            fullWidth
            href="/gate-ready/timeline"
          >
            Start Trip
          </Button>
        </CardContent>
      </Card>
    );
};

export default BookingCard;