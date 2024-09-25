import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component that checks if a user is authenticated
const ProtectedRoute = ({ isAuthenticated, children }) => {
    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
