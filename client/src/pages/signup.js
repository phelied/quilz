import React from "react";
import axios from 'axios';
import AuthForm from "../components/authForm";

const SignUp = () => {


    const handleSubmit = (email, password) => {
        console.log(email, password)
        axios.post('http://localhost:3000/signup', { email, password }, {
            headers: {
                'Origin': 'http://localhost:3001'
            }
        })
            .then(response => {
                console.log(response)
                // Stocke le jeton d'authentification dans le stockage local
                localStorage.setItem('token', response.data.token);
                // Redirige l'utilisateur vers la page protégée
                window.location.href = '/profile';
            })
            .catch(error => {
                console.log(error)
                // setError('Identifiants invalides');
            });
    }

    return (
        <>
            <AuthForm onSubmit={handleSubmit} isSignUp={true} />
        </>
    );
};


export default SignUp;