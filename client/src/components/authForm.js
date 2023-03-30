
import React from "react";
import styled from "styled-components";
import Character from "../assets/images/character-loginPage.png";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

const AuthForm = ({ onSubmit, isSignUp }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });

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
                    <h2>Play quizzes!<br /></h2>
                    <p>
                    Test your knowledge on topics of general culture and current events. Discover a new quiz every day!
                    </p>
                </Introduction>
                <Form>
                    <p className="title">Register </p>
                    <p className="message">{isSignUp ? 'Signup now and get full access to our app.' : ' Signin now and get full access to our app.'} </p>
                    <label>
                        <input type="email"
                            id="email"
                            name="email"
                            placeholder=""
                            className='input'
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })} />
                        <span>Email</span>
                    </label>
                    {errors && errors.email && errors.email && <span className='error-message'>{errors.email.message}</span>}
                    <label>
                        <input type="password"
                            name="password"
                            id="password"
                            placeholder=""
                            className='input'
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })} />
                        <span>Password</span>
                    </label>
                    {errors && errors.password && <span className='error-message'>{errors.password.message}</span>}
                    <button className="submit" type="submit">{isSignUp ? 'Sign up' : 'Log in'}</button>
                </Form>
                {isSignUp ? (<p className="signin">Already have an acount ?  <Link to="/signin"> Sign in </Link></p>) : (<p className="signin">Already have an acount ?   <Link to="/signup"> Sign up for free </Link></p>)}
            </FormContainer>
        </LoginContainer>
    );
};

const LoginContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    height: 80vh;

    & .container-image {
        height: 50%;
    }

    & img {
        width: 100%;
    }

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
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
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    
  & .error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    }

  & .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }
  
  & .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }
  
 &  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }
  
 & .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }
  
  & .message, .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }
  
 & .signin {
    text-align: center;
  }
  
  & .signin a {
    color: royalblue;
  }
  
  & .signin a:hover {
    text-decoration: underline royalblue;
  }
  
  & .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }
  
  & label {
    position: relative;
    width: 90%;
  }
  
  & label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }
  
  & label .input + span {
    position: absolute;
    left: 10px;
    top: 26px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }
  
  & label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }
  
  & label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }
  
  & label .input:valid + span {
    color:  ;
  }
  
  & .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }
  
  & .submit:hover {
    background-color: rgb(56, 90, 194);
  }
  
  & @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }
  
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default AuthForm;