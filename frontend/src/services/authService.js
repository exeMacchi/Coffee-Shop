import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

/* --- REGISTER --- */
async function register( formData ) {
    try {
        const res = await axios.post(
            `${BASE_URL}/auth/register`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        return res;
    }
    catch (err) {
        console.error(err);
        return err.response;
    }
}


/* --- LOGIN --- */
async function login( formData ) {
    try {
        const res = await axios.post(
            `${BASE_URL}/auth/login`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );

        return res;
    }
    catch (err) {
        console.error(err);
        return err.response;
    }
}

/* --- LOGOUT --- */
async function logout() {
    try {
        const res = await axios.get(`${BASE_URL}/auth/logout`, {
            withCredentials: true
        });
        return res;
    }
    catch (err) {
        console.error(err);
        return err.response;
    }
}

export {
    register,
    login,
    logout
}
