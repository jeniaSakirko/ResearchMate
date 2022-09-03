import React, {useState, useEffect} from 'react';
import {Dropdown} from 'primereact/dropdown';
import {getAll, assign, unassign} from '../api/research';
import {Button} from 'primereact/button';
import {getUserToken} from "../common/UserContext";

import '../css/ChangeStatus.css';

export const RegisterToResearch = () => {
    const [selectedResearch, setSelectedResearch] = useState(null);
    const [researches, setResearches] = useState(null);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        getUserToken().then(token => {
            setUserToken(token);
            getAll(token).then(data => {
                setResearches(data);
            })
        });
    }, []);

    const onResearchChange = (e) => {
        setSelectedResearch(e.value);
    }

    const onAssign = async () => {
        // TODO: change participant_id
        let participant_id = 16;
        await assign(userToken, participant_id, selectedResearch.id)
    }

    const unAssign = async () => {
        // TODO: change participant_id
        let participant_id = 16;
        await unassign(userToken, participant_id, selectedResearch.id)
    }


    return (
        <div className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                    <h5>Select a research</h5>
                    <Dropdown value={selectedResearch} options={researches} onChange={onResearchChange}
                              optionLabel="name" placeholder="Select a research"/>
                    <Button onClick={onAssign} label="Register To Research" className="p-button-rounded"/>
                    <Button onClick={unAssign} label="Cancel Register To Research" className="p-button-rounded"/>
                </div>
            </div>
        </div>
    );
}
