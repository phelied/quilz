import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const Profile = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});

    useEffect(() => {
        API.getUser(token).then((res) => {
            // console.log(res)
            setUser(res);
        });
    }, []);

    return (<>Profile</>);
};

export default Profile;