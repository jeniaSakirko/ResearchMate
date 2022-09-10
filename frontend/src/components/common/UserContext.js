import {createContext} from "react";

export const UserContext = createContext(null);

export const getUserToken = async () => {
    return localStorage.getItem("userToken");
};

export const getUserType = async () => {
    return localStorage.getItem("userType");
};