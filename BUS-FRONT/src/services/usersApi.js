import axios from 'axios'

export const searchRoute = async (url) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/user/route/search${url}`);
        console.log(res.data); // Log received data
        return res.data; // Return fetched data
    } catch (error) {
        throw error; // Let Axios throw the error
    }
};