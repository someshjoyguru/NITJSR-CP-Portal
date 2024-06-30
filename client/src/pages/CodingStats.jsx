import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ProtectedRoute from '../utils/ProtectedRoute';
import { Context } from '../main';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Grid, Paper, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

const CodingStats = () => {
  const { user } = useContext(Context);
  const [stats, setStats] = useState(null);
  const [contestHistory, setContestHistory] = useState([]);
  const [problemStats, setProblemStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.codeforces) {
        if (!stats || !contestHistory.length || !problemStats.length) {
          try {
            const [statsResponse, contestHistoryResponse, problemStatsResponse] = await Promise.all([
              axios.get(`https://codeforces.com/api/user.info?handles=${user.codeforces}`),
              axios.get(`https://codeforces.com/api/user.rating?handle=${user.codeforces}`),
              axios.get(`https://codeforces.com/api/user.status?handle=${user.codeforces}`)
            ]);

            setStats(statsResponse.data.result[0]);
            setContestHistory(contestHistoryResponse.data.result);
            setProblemStats(problemStatsResponse.data.result);
          } catch (error) {
            toast.error('Failed to fetch Codeforces data');
          }
        }
      } else {
        setError('Enter your Codeforces handle from the dashboard');
      }
    };

    fetchData();
  }, [user, stats, contestHistory, problemStats]);

  const columns = [
    { field: 'contestId', headerName: 'Contest ID', width: 150 },
    { field: 'contestName', headerName: 'Contest Name', width: 300 },
    { field: 'rank', headerName: 'Rank', width: 150 },
    { field: 'ratingUpdateTimeSeconds', headerName: 'Time', width: 200 },
    { field: 'oldRating', headerName: 'Old Rating', width: 150 },
    { field: 'newRating', headerName: 'New Rating', width: 150 },
  ];

  const rows = contestHistory.map((contest, index) => ({
    id: index,
    contestId: contest.contestId,
    contestName: contest.contestName,
    rank: contest.rank,
    ratingUpdateTimeSeconds: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleString(),
    oldRating: contest.oldRating,
    newRating: contest.newRating,
  }));

  const problemTypes = problemStats.reduce((acc, problem) => {
    const { problem: { tags } } = problem;
    tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const ratingDistribution = problemStats.reduce((acc, problem) => {
    const { problem: { rating } } = problem;
    if (rating) {
      acc[rating] = (acc[rating] || 0) + 1;
    }
    return acc;
  }, {});

  const problemTypesData = Object.keys(problemTypes).map(tag => ({ tag, count: problemTypes[tag] }));
  const ratingDistributionData = Object.keys(ratingDistribution).map(rating => ({ rating, count: ratingDistribution[rating] }));
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19FF4A', '#FFD319', '#19D1FF', '#8E19FF'
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ProtectedRoute>
      <Box
        sx={{
          padding: '30px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ...(isMobile ? {} : { width: '50%' }),
        }}
      >
        {error ? (
          <Box>{error}</Box>
        ) : (
          stats && (
            <Box>
              <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
    <Typography
      variant="h4"
      component="h2"
      align="center"
      color="primary"
      gutterBottom
    >
      Statistics for: {stats.firstName? (stats.firstName + ' ' + (stats.lastName?stats.lastName:null)): stats.handle}
    </Typography>
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="p">
            <b>Handle:</b>
          </Typography>
          <Typography variant="body1" component="p">
            {stats.handle}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="p">
            <b>Country:</b>
          </Typography>
          <Typography variant="body1" component="p">
            {stats.country}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="p">
            <b>Current Rating:</b>
          </Typography>
          <Typography variant="body1" component="p">
            {stats.rating}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="p">
            <b>Max Rating:</b>
          </Typography>
          <Typography variant="body1" component="p">
            {stats.maxRating} <span>{stats.maxRank}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="p">
            <b>Current Rank:</b>
          </Typography>
          <Typography variant="body1" component="p">
            {stats.rank}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Paper>
              {contestHistory.length > 0 && (
                <Box mt={4}>
                  <h3>Contest History</h3>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} />
                  </div>
                </Box>
              )}
              {problemTypesData.length > 0 && (
                <Box mt={4}>
                  <h3>Types of Problems Solved</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={problemTypesData}
                        dataKey="count"
                        nameKey="tag"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {problemTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              )}

              {ratingDistributionData.length > 0 && (
                <Box mt={4}>
                  <h3>Rating-wise Problems Solved</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ratingDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rating" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Box>
          )
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default CodingStats;
