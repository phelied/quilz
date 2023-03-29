
import React, { useState } from "react";
import styled from "styled-components";
import Character from "../assets/images/character-loginPage.png";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

const AuthForm = ({ onSubmit, isSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });


    // const handleSubmi = (event) => {
    //     event.preventDefault();
    //     onSubmit(email, password);
    // };

    const onSubmitForm = (data) => {
        onSubmit(data.email, data.password);
    };

    return (
        <LoginContainer>
            <div className="container-image">
                <img src={Character} alt="login" />
            </div>
            <FormContainer onSubmit={handleSubmit(onSubmitForm)}>
                <Introduction>
                    <h2>Joue à <br />des quiz ! </h2>
                    <p>
                        Teste tes connaissances sur des sujets de culture générale comme sur l'actualité. Un nouveau quiz par jour à découvrir !
                    </p>
                </Introduction>
                <Form>
                    <input type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })} />
                    {errors && errors.email && errors.email && <span>{errors.email.message}</span>}
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        {...register('password', {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })} />
                    {errors && errors.password && <span>{errors.password.message}</span>}
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
    background-color: white;
    padding: 1rem;
    border-radius: 10px;

    & input {
        border-radius: 10px;
        outline: 2px solid #FEBF00;
        border: 0;
        background-color: #e2e2e2;
        outline-offset: 3px;
        padding: 10px 1rem;
        transition: 0.25s;
        margin: 0.5rem 0;
    }

    & input:focus {
        outline-offset: 5px;
        background-color: #fff
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