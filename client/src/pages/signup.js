import React, { useState } from "react";
import axios from 'axios';
import AuthForm from "../components/authForm";
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (email, password) => {
        axios.post('http://localhost:3000/signup', { email, password })
            .then(response => {
                console.log(response)
                // Stocke le jeton d'authentification dans le stockage local
                localStorage.setItem('token', response.data.accessToken);
                // Redirige l'utilisateur vers la page protégée
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
            <AuthForm onSubmit={handleSubmit} isSignUp={true} />
        </>
    );
};


export default SignUp;