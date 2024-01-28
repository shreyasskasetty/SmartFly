import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const BookingCard = () => {
    const bookingDetails = {
        flightNumber: 'AB123',
        destination: 'New York',
        date: '2024-01-28',
        // add more booking details as needed
    };

    return (
        <Card sx={{
            bgcolor: '#2B2B2B',
            color: '#FFF',
            minWidth: { xs: 200, sm: 300, md: 345 }, // Responsive min width
            maxWidth: { xs: '100%', sm: '100%', md: 345 }, // Responsive max width
          }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Flight Number: {bookingDetails.flightNumber}
                </Typography>
                <Typography variant="body2">
                    Destination: {bookingDetails.destination}
                </Typography>
                <Typography variant="body2">
                    Date: {bookingDetails.date}
                </Typography>
                {/* Add more booking details here */}
                <Button 
                    size="small" 
                    variant="contained" 
                    sx={{ mt: 2 }}
                    href="/gate-ready/timeline"
                    // Implement navigation logic here
                >
                    Track Timeline
                </Button>
            </CardContent>
        </Card>
    );
};

export default BookingCard;
