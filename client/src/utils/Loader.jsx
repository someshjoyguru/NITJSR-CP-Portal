import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: orange; }
`;

const AnimatedText = ({ text, animationDelay }) => (
  <Box
    component="div"
    sx={{
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      borderRight: '.15em solid orange',
      animation: `${typing} 4s steps(${text.length}, end) ${animationDelay}s infinite, ${blink} .75s step-end infinite`,
      fontSize: '1.25rem',
      color: 'black',
    }}
  >
    {text}
  </Box>
);

const Loader = () => {
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondLine(true);
    }, 4000); // 4 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <CircularProgress />
      {!showSecondLine && (<Typography variant="h6">
        <AnimatedText text="Please wait a moment..." animationDelay={0} />
      </Typography >)}
      {showSecondLine && (
        <Typography sx={{ mt: 2, mb: 2 }} variant="body2">
          <AnimatedText text="Creating summary for your post..." animationDelay={0} />
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
