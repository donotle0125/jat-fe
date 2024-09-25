// src/components/UnauthenticatedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// UnauthenticatedRoute component that checks if a user is authenticated
const UnauthenticatedRoute = ({ isAuthenticated, children }) => {
    // If the user is authenticated, redirect to the dashboard or home
    if (isAuthenticated) {
        return <Navigate to='/user/dashboard' replace />; // Change to the route you want authenticated users to go to
    }

    // If not authenticated, render the intended component
    return children;
};

export default UnauthenticatedRoute;
