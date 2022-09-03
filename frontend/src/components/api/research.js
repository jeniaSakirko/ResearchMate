import {RESEARCH_GET_ALL,RESEARCH_ASSIGH,RESEARCH_UNASSIGH} from "../common/consts";
import axios from "axios";


export const getAll = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    try {
        const res = await axios
            .get(RESEARCH_GET_ALL, config);
        return res.data;
    } catch (e) {
        console.log(e);
    } 
};

export const assign = async (token, participant_id,research_id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    const body = JSON.stringify({participant_id});
    try {
        const assign = RESEARCH_GET_ALL+"/"+research_id+RESEARCH_ASSIGH;
        const res = await axios
            .post(assign, body, config);
        return res.data.token;
    } catch (e) {
        console.log(e);
    }


};


export const unassign = async (token, participant_id,research_id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        };
    
        const body = JSON.stringify({participant_id});
        try {
            const assign = RESEARCH_GET_ALL+"/"+research_id+RESEARCH_UNASSIGH;
            const res = await axios
                .post(assign, body, config);
            return res.data.token;
        } catch (e) {
            console.log(e);
        }
    
    
};