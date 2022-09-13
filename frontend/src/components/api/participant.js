import {
    PARTICIPANT_REGISTER_URL,
    PARTICIPANT_GET_ALL_URL,
    PARTICIPANT_GET_ALL_FORMS_URL,
    PARTICIPANT_PUT_AGREE_ON_FORM_URL,
    BASE_PARTICIPANT_API, PARTICIPANT_GET_RESEARCH,
    PARTICIPANT_INFO,
    PARTICIPANT_DISABLE,
    PARTICIPANT_ENABLE
} from "../common/consts";
import axios from "axios";
import {getHeader} from "./common";


export const register = async (username, password, email, first_name, last_name, phone_number) => {
    return getHeader().then(async config => {
        const body = JSON.stringify({username, password, email, first_name, last_name, phone_number});
        try {
            const res = await axios
                .post(PARTICIPANT_REGISTER_URL, body, config);
            return res;
        } catch (e) {
            console.log(e);
            return e.response;
        }
    });
};


export const getAll = async () => {
    return getHeader(true).then(async config => {
        try {
            const res = await axios
                .get(PARTICIPANT_GET_ALL_URL, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};

export const getParticipant = async (participantId) => {
    return getHeader(true).then(async config => {
        try {
            const res = await axios
                .get(BASE_PARTICIPANT_API + '/' + participantId, config);
            return res.data.user;
        } catch (e) {
            console.log(e);
        }
    });
};


export const disableParticipant = async (participant_id) => {
    return getHeader(true).then(async config => {
        const body = JSON.stringify({participant_id});
        try {
            const res = await axios
                .post(PARTICIPANT_DISABLE, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};

export const enableParticipant = async (participant_id) => {
    return getHeader(true).then(async config => {
        const body = JSON.stringify({participant_id});
        try {
            const res = await axios
                .post(PARTICIPANT_ENABLE, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};


export const getAllForms = async () => {
    return getHeader(true).then(async config => {
        try {
            const res = await axios
                .get(PARTICIPANT_GET_ALL_FORMS_URL, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
    
};

export const participantInfo = async () => {
    return getHeader(true).then(async config => {
        try {
            const res = await axios
                .get(PARTICIPANT_INFO, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
    
};

export const agreeOnForm = async (form_id) => {
    return getHeader(true).then(async config => {
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
    });
};

export const getParticipantResearchHistory = async (participantId, query_status = null) => {
    return getHeader(true).then(async config => {
        try {
            if (query_status) {
                config.params = {status: query_status};
            }
            const res = await axios
                .get(BASE_PARTICIPANT_API + '/' + participantId + PARTICIPANT_GET_RESEARCH, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};
