import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Context, server } from '../main';
import axios from 'axios';
import { Box } from '@mui/system';
import ProtectedRoute from '../utils/ProtectedRoute';

import { DataGrid } from '@mui/x-data-grid';

const CodingStats = () => {
  

  return (
    <>
      <ProtectedRoute>
      <Box>
        <Box sx={{
          marginX: '50px',
          marginY: '10px'
        }}>
          <Box sx={{
            gap: '8px',
            flexGrow: 1,
            padding: '30px',
            width: '70%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            CodingStats
          </Box>
        </Box>
      </Box>
      </ProtectedRoute>
    </>
  )

}

export default CodingStats