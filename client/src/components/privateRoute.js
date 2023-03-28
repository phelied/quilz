import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('no token');
        return <Navigate to="/signin" />;
    }
    return children;
};


export default PrivateRoute;
