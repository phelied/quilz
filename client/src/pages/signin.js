import React, { useState } from "react";
import styled from "styled-components";
import Character from "../assets/images/character-loginPage.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import AuthForm from "../components/authForm";

const path = window.location.pathname;
console.log(path)

const SignIn = () => {

    const handleSubmit = (email, password) => {
        axios.post('localhost:3000/signin', { email, password })
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
        <LoginContainer>
            <AuthForm onSubmit={handleSubmit} />
        </LoginContainer>
    );
};

const LoginContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #7380ff;

    & .container-image {
        height: 50%;
    }

    & img {
        width: 100%;
    }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h2 {
        font-family: "Caraque-Melt";
        font-weight: 800;
        font-size: 3.75rem;
        text-align: center;
        margin: 0;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    border: none;

    & input {
        height: 50px;
        margin: 0.5rem 0;
        padding: 0 1rem;
        font-size: 1.25rem;
        color: black;
        border: 1px solid black;
        border-radius: 0.75rem;
    }

    & input::placeholder {

        color: black;
    }

    & button {
        height: 50px;
        border-radius: 0.75rem;
        margin: 0.5rem 0;
        padding: 0 1rem;
        font-size: 1.25rem;
        background-color: black;
        color: white;
        font-weight: 800;
        cursor: pointer;
    }
`;

export default SignIn;