import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import ImageList from './components/ImageList';
import './index.css'
import NavBar from './components/Navbar';

function App() {
  return (
    <div>
      <CssBaseline />
      <Container>
        <NavBar />
        <ImageList />
      </Container>
    </div>
  );
}

export default App;
