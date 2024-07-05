import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingContests = () => {
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://codeforces.com/api/contest.list');
                const contests = response.data.result;
                const upcoming = contests.filter((contest) => contest.phase === 'BEFORE');
                setUpcomingContests(upcoming.reverse());
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
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
            <Typography
            variant="h4"
            sx={{
                textAlign: 'center',
                marginTop: '30px',
                color: '#3f51b5', 
                fontWeight: 'bold',
                letterSpacing: '1px', 
            }}
            >
            Upcoming Contests
            </Typography>;

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                upcomingContests.map((contest) => (
                    <Box
                        key={contest.id}
                        sx={{
                            margin: '10px',
                            padding: '20px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            width: {
                                xs: '90%',
                                sm: '70%',
                                md: '50%',
                                lg: '50%',
                                xl: '50%',
                            },
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: '10px', color: '#3f51b5' }}>
                            {contest.name}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Start Time:</strong>{' '}
                            {new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Duration:</strong>{' '}
                            {Math.floor(contest.durationSeconds / 3600)} hours
                        </Typography>
                        <Typography variant="body1">
                            <strong>Type:</strong> {contest.type}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Frozen:</strong>{' '}
                            {contest.frozen ? 'Yes' : 'No'}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    margin: '10px',
                                    padding: '12px 24px',
                                    width: { xs: '100%', sm: '40%' },
                                }}
                                href={`https://codeforces.com/contest/${contest.id}`}
                            >
                                Register
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    margin: '10px',
                                    padding: '12px 24px',
                                    width: { xs: '100%', sm: '40%' },
                                }}
                                href={`https://codeforces.com/contests?complete=true`}
                            >
                                All Contests
                            </Button>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default UpcomingContests;
