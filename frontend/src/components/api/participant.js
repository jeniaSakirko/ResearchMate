import {REGISTER_URL} from "../common/consts";
import axios from "axios";


export const register = async (username, password, email, first_name, last_name, phone_number) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({username, password, email, first_name, last_name, phone_number});
    try {
        const res = await axios
            .post(REGISTER_URL, body, config);
        return res;
    } catch (e) {
        console.log(e);
    }
};