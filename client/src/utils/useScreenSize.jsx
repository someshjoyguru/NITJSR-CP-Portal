// Import React hooks
import React, { useState, useEffect } from 'react';

// Define a custom hook that returns the screen width and height
const useScreenSize = () => {
  // Initialize the state with the current window dimensions
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Define a function that updates the state with the new window dimensions
  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  // Use the useEffect hook to add and remove the window resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Return the screen size state
  return screenSize;
};

// Export the custom hook
export default useScreenSize;
