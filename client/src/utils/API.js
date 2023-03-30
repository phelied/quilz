import axios from "axios";

const API = {
    getListQuizzes: async () => {
        try {
            const response = await axios.get('http://localhost:3000/');
            return (response);
        } catch (error) {
            console.error(error);
        }
    }, getQuizById: async (id, token) => {
        try {
            const response = await axios.get(`http://localhost:3000/quiz/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `bearer ${token}`
                }
            });
            return (response);
        } catch (error) {
            console.error(error);
        }
    },
    getUser: async (token) => {
        try {
            const response = await axios({
                method: 'GET',
                url: "http://localhost:3000/profile",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `bearer ${token}`

                }
            })
            return (response);
        } catch (error) {
            console.error(error);
        }
    },
    dispatchResult: async (id, token, result) => {
        try {
            const response = await axios({
                method: 'POST',
                url: "http://localhost:3000/result",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                data: {
                    id: id,
                    result: result
                }
            })
            return (response);
        } catch (error) {
            console.error(error);
        }
    }
}

export default API;