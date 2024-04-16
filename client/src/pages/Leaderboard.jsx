import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Context, server } from '../main';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'rank', headerName: 'Rank', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'codeforces', headerName: 'Codeforces Id', width: 130 },
  {
    field: 'codeforcesRating',
    headerName: 'Codeforces Rating',
    width: 70,
  }
];

const Leaderboard = () => {
  const { isAuthenticated } = useContext(Context);
  const [leader, setLeader] = useState([]);

  if (!isAuthenticated) return <Navigate to="/login" />;
  useEffect(() => {
    axios.get(`${server}/leaderboard`, {
      withCredentials: true,
    })
      .then((res) => {
        const rankedLeaderboard = res.data.leaderboard.map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
        setLeader(rankedLeaderboard);
        
        toast.success("Leaderboard fetched successfully!");
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });
  }, []);


  return (
    <>
    {console.log(leader)}
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={leader}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,20,50,100]}
        getRowId={(row) => row._id}
      />
    </div>
    </>
  )

}

export default Leaderboard