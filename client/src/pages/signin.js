import React, { useState } from "react";
import axios from 'axios';
import AuthForm from "../components/authForm";
import { useNavigate, useLocation } from 'react-router-dom';

import ErrorMessage from '../components/errorMessage';

const SignIn = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = location.state && location.state.message;
    if (errorMessage) {
        navigate("/signin", { replace: true }, { state: undefined });
    }

    const handleSubmit = (email, password) => {
        axios.post('http://localhost:3000/signin', { email, password })
            .then(response => {
                // Stocke le jeton d'authentification dans le stockage local
                localStorage.setItem('token', response.data.accessToken);
                // Redirige l'utilisateur vers la page protégée
                navigate('/profile');
                location.state = { message: '' };
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
            <AuthForm onSubmit={handleSubmit} />
        </>
    );
};

export default SignIn;