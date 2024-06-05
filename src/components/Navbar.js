import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../index.css'

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="h1" gutterBottom className='navbar'>Animal Image Gallery</Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;

