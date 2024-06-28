import { Paper, Typography } from '@mui/material';
import React from 'react'

const Quote = ({ text, author }) => {
    return (
        <Paper elevation={3} sx={{ padding: '10px', marginTop: '10px', backgroundColor: '#f0f0f0' }}>
        <blockquote>
            <Typography sx={{ fontStyle: 'italic' }}>
            {text} - {author}
            </Typography>
        </blockquote>
        </Paper>
    );
};

export default Quote;