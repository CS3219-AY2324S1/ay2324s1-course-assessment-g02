import React from 'react';
import { Box } from '@mui/material';
import './index.css';

export default function Loading() {
  return (
    <>
      <Box
        display="flex"
        height={'100vh'}
        width={'100vw'}
        alignItems="center"
        justifyContent="center"
      >
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </Box>
    </>
  );
}
