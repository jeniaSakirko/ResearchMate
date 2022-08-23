import {RESEARCH_GET_ALL} from "../common/consts";
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