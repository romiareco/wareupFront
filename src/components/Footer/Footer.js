import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Copyright} from '../Copyright';

export function Footer() {
  
    return (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    );
}