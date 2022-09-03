import {
    PARTICIPANT_REGISTER_URL,
    PARTICIPANT_GET_ALL_URL,
    PARTICIPANT_GET_ALL_FORMS_URL,
    PARTICIPANT_PUT_AGREE_ON_FORM_URL,
    BASE_PARTICIPANT_API
} from "../common/consts";
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

export const getParticipant = async (token, participantId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    try {
        const res = await axios
            .get(BASE_PARTICIPANT_API + '/' + participantId, config);
        return res.data.user;
    } catch (e) {
        console.log(e);
    }
};

export const getAllForms = async (token) => {
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

export const agreeOnForm = async (form_id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token 5edc0472edff4f68d973f801de4f6224ce8eb4ff55304c206ed9582b6cc76b52`,
        },
    };
    const body = {
        "form_id": form_id
    };
    try {
        const res = await axios
            .put(PARTICIPANT_PUT_AGREE_ON_FORM_URL, body, config);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
