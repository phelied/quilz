import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('no token');
        return <Navigate to="/signin" state={{ message: 'Please sign in to access this page' }}/>;
    }
    return children;
};


export default PrivateRoute;
