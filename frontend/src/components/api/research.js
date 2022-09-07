import {RESEARCH_GET_ALL, RESEARCH_ASSIGH, RESEARCH_UNASSIGH} from "../common/consts";
import axios from "axios";
import {getHeader} from "./common";


export const getAll = async () => {
    return getHeader(true).then(async config => {
        try {
            const res = await axios
                .get(RESEARCH_GET_ALL, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};

export const assign = async (participant_id, research_id) => {
    return getHeader(true).then(async config => {
        const body = JSON.stringify({participant_id});
        try {
            const assign = RESEARCH_GET_ALL + "/" + research_id + RESEARCH_ASSIGH;
            const res = await axios
                .post(assign, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};


export const unassign = async (participant_id, research_id) => {
    return getHeader(true).then(async config => {
        const body = JSON.stringify({participant_id});
        try {
            const assign = RESEARCH_GET_ALL + "/" + research_id + RESEARCH_UNASSIGH;
            const res = await axios
                .post(assign, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    });
};