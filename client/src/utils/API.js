import axios from "axios";

const API = {
    getListQuizzes: async () => {
        try {
            const response = await axios.get('http://localhost:3000/', {
                headers: {
                    'Origin': 'http://localhost:3001'
                }
            });
            return (response);
        } catch (error) {
            console.error(error);
        }
    },
}

export default API;