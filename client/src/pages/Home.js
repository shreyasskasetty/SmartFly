// Home.js
import React from 'react';
import BookingCard from '../components/BookingCard'; // Make sure this path is correct
import { Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop: '64px'}}>
      <BookingCard />
    </Container>
  );
};

export default Home;