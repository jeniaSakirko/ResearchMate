import React, {useContext, useState} from 'react';
import {UserContext} from "../common/UserContext";


export const ResearcherHomePage = () => {
    const {userToken} = useContext(UserContext);

    return (
        <div className="flex justify-content-center aligned-items-center vertical-align-middle" style={{
            marginTop: "35%"
        }}>
            {userToken}
            <p>lior is hedfe</p>
        </div>
    );
}
