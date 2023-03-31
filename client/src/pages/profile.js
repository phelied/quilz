import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import styled from 'styled-components';
import UserHistoryItem from '../components/userHistoryItem';

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUser(token).then((res) => {
            setUser(res.data);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (<Wrapper>
        <UserInfo>
            <div className="card">
                <div className="info">
                    <span>{user.email}</span>
                    <p>Total quizzes done</p>
                </div>
                <button>{user.quizzes && user.quizzes.length}</button>
            </div>
        </UserInfo>
        <div>
            <h2>Quiz History</h2>
            {user.quizzes && user.quizzes.length !== 0 && (
                <Cards>
                    {user.quizzes.map((user) => <UserHistoryItem user={user} />)}
                </Cards>
            )}
        </div>
    </Wrapper>);
};

const Wrapper = styled.main`
display: flex;
flex-direction: column;
margin: 1rem 2rem;
justify-content: center;
`;

const Cards = styled.div`
display: flex;
flex-wrap: wrap;
`;

const UserInfo = styled.div`
    height: 254px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    background: #f2f2f3;
    border-radius: 12px;
    box-shadow: inset 5px 5px 10px #a9a9aa77,
                 inset -5px -5px 10px #ffffff7e;
   
   & .info {
    text-align: center;
    margin-top: 0.4em;
    background: linear-gradient(120deg, rgba(0,194,255,1) 0%, rgba(0,86,255,1) 100%);
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
   }
   
   & .info > span {
    font-weight: bold;
    font-size: 1.2em;
   }
   
   & button {
    margin-top: 1em;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(90deg, rgba(0,194,255,1) 0%, rgba(0,86,255,1) 100%);
    padding: .5em 2em;
    border-radius: 0.7em;
   }
   
   & button:active {
    box-shadow: inset 3px 3px 3px #0056ff,
                inset -3px -3px 3px #00c2ff;
   }
`;

export default Profile;