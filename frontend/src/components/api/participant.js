import {PARTICIPANT_REGISTER_URL, PARTICIPANT_GET_ALL_URL, PARTICIPANT_GET_ALL_FORMS_URL} from "../common/consts";
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
            .post(PARTICIPANT_REGISTER_URL, body, config);
        return res;
    } catch (e) {
        console.log(e);
        return e.response;
    }
};


export const getAll = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    try {
        const res = await axios
            .get(PARTICIPANT_GET_ALL_URL, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getAllForms = async (participant_id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };
    try {
        const res = await axios
            .get(PARTICIPANT_GET_ALL_FORMS_URL, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
