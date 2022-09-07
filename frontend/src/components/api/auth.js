import {LOGIN_URL, LOGOUT_URL} from "../common/consts";
import axios from "axios";
import {getHeader} from "./common";


export const login = async (username, password) => {
    return getHeader().then(async config => {
        const body = JSON.stringify({username, password});
        try {
            const res = await axios
                .post(LOGIN_URL, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};

export const logout = async () => {
    return getHeader(true).then(async config => {
        const body = JSON.stringify({});
        try {
            const res = await axios.post(LOGOUT_URL, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};

