import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../main'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(Context);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;