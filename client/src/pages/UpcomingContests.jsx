import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const UpcomingContests = () => {
    const [upcomingContests, setUpcomingContests] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://codeforces.com/api/contest.list');
                const contests = response.data.result;
                const upcoming = contests.filter((contest) => contest.phase === 'BEFORE');
                setUpcomingContests(upcoming);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); 

    return (
        <Box sx={{
            flexGrow: 1,
            marginX: isMobile ? '20px' : '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px' }}>Upcoming Contests</Typography>
            {upcomingContests.map((contest) => (
                <Box key={contest.id} sx={{
                    margin: '10px',
                    padding: '10px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    width: {
                        xs: '90%',
                        sm: '70%',
                        md: '50%',
                        lg: '50%',
                        xl: '50%',
                    },
                }}>
                    <Typography variant="h6" sx={{ paddingLeft: '10%' }}>{contest.name}</Typography>
                    <Typography variant="body1" sx={{ paddingLeft: '10%' }}>Start Time: {new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}</Typography>
                    <Typography variant="body1" sx={{ paddingLeft: '10%' }}>Duration: {contest.durationSeconds / 3600} hours</Typography>
                    <Typography variant="body1" sx={{ paddingLeft: '10%' }}>Type: {contest.type}</Typography>
                    <Typography variant="body1" sx={{ paddingLeft: '10%' }}>Frozen: {contest.frozen ? 'Yes' : 'No'}</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Button variant="contained" color="primary" sx={{
                            margin: '10px',
                            padding: '10px',
                            width: isMobile ? '100%' : '40%',
                        }} href={`https://codeforces.com/contest/${contest.id}`}>Register</Button>
                        <Button variant="contained" color="primary" sx={{
                            margin: '10px',
                            padding: '10px',
                            width: isMobile ? '100%' : '40%',
                        }} href={`https://codeforces.com/contests?complete=true`}>All Contests</Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default UpcomingContests;
