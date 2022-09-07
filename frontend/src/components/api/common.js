import {getUserToken} from "../common/UserContext";

export const getHeader = async (withToken) => {
    if (withToken) {
        return getUserToken().then(token => {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            };
        });
    } else {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
        };
    }
};
