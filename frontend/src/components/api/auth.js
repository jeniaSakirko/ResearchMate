import {LOGIN_URL} from "../common/consts";
import axios from "axios";


export const login = async (username, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({username, password});
    try {
        const res = await axios
            .post(LOGIN_URL, body, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};