import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUser(token).then((res) => {
            console.log(res)
            setUser(res.data);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (<>{user && user.length !== 0 && <span>{user.email}</span>}</>);
};

export default Profile;