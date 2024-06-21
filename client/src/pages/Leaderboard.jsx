import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Context, server } from '../main';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: theme.spacing(3),
}));

const Header = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  color: '#333',
}));

const GridContainer = styled(Box)(({ theme }) => ({
  marginX: '50px',
  marginY: '10px',
}));

const GridBox = styled(Box)(({ theme }) => ({
  gap: '8px',
  flexGrow: 1,
  padding: theme.spacing(3),
  width: '70%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
}));

const dataGridStyles = {
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#3f51b5',
    color: '#00000',
    fontSize: '16px',
    fontWeight: '900',
  },
  '& .MuiDataGrid-row': {
    backgroundColor: '#f5f5f5',
  },
  '& .MuiDataGrid-cell': {
    fontSize: '14px',
  },
};

const columns = [
  { field: 'rank', headerName: 'Rank' },
  { field: 'name', headerName: 'Name' },
  { field: 'codeforces', headerName: 'Codeforces Id' },
  { field: 'codeforcesRating', headerName: 'Rating' },
];

const Leaderboard = () => {
  const [leader, setLeader] = useState([]);

  useEffect(() => {
    axios.get(`${server}/leaderboard`, {
      withCredentials: true,
    })
      .then((res) => {
        const rankedLeaderboard = res.data.leaderboard;
        rankedLeaderboard.sort((a, b) => b.codeforcesRating - a.codeforcesRating);
        const sortedLeaderboard = rankedLeaderboard.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
        setLeader(sortedLeaderboard);
        toast.success("Leaderboard fetched successfully!");
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });
  }, []);

  return (
    <Container>
      <Header variant="h4">
        Leaderboard
      </Header>
      <GridContainer>
        <GridBox>
          <DataGrid
            rows={leader}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            getRowId={(row) => row._id}
            sx={dataGridStyles}
          />
        </GridBox>
      </GridContainer>
    </Container>
  );
};

export default Leaderboard;
