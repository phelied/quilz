import React, { useState } from "react";
import axios from 'axios';
import AuthForm from "../components/authForm";
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorMessage from '../components/errorMessage';

const SignUp = () => {
    const [error, setError] = useState('');
    const location = useLocation();
    const errorMessage = location.state && location.state.message;
    const navigate = useNavigate();

    const handleSubmit = (email, password) => {
        axios.post('http://localhost:3000/signup', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.accessToken);
                // Redirect to the profile page
                navigate('/profile');
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setError('Email ou mot de passe incorrect');
                } else {
                    setError('Une erreur s\'est produite, veuillez réessayer plus tard');
                }
            });
    }

    return (
        <>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {error && <ErrorMessage message={error} />}
            <AuthForm onSubmit={handleSubmit} isSignUp={true} />
        </>
    );
};


export default SignUp;