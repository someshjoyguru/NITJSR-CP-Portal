import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Context, server } from '../main';
import axios from 'axios';
import { Box } from '@mui/system';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'rank', headerName: 'Rank'},
  { field: 'name', headerName: 'Name'},
  { field: 'codeforces', headerName: 'Codeforces Id'},
  {
    field: 'codeforcesRating',
    headerName: 'Rating'
  }
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
    <>
      {/* {console.log(leader)} */}
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
            />
          </Box>
        </Box>
      </Box>
    </>
  )

}

export default Leaderboard