
import React, { useState } from "react";
import styled from "styled-components";
import Character from "../assets/images/character-loginPage.png";
import { Link } from "react-router-dom";

const AuthForm = ({ onSubmit, isSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(email, password);
    };

    return (
        <LoginContainer>
            <div className="container-image">
                <img src={Character} alt="login" />
            </div>
            <FormContainer onSubmit={handleSubmit}>
                <Introduction>
                    <h2>Joue à <br />des quiz ! </h2>
                    <p>
                        Teste tes connaissances sur des sujets de culture générale comme sur l'actualité. Un nouveau quiz par jour à découvrir !
                    </p>
                </Introduction>
                <Form>
                    <input type="email" onChange={event => setEmail(event.target.value)} value={email} name="email" id="email" placeholder="Email" />
                    <input type="password" onChange={event => setPassword(event.target.value)} value={password} name="password" id="password" placeholder="Password" />
                    <button type="submit">{isSignUp ? 'Sign up' : 'Log in'}</button>
                </Form>
                {isSignUp ? (<span>You already have an account ? <Link to="/signin"> Sign in </Link></span>) : (<span>Dont't have an account ? <Link to="/signup"> Sign up for free </Link></span>)}
            </FormContainer>
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

export default AuthForm;