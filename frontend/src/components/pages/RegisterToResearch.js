import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../css/ChangeStatus.css';
import {getAll,assign} from '../api/research';
import {Button} from 'primereact/button';
const token ="5c2c225b4743d12b4e5d29b7be8df7d817ef39b67dfacf0219755463c7a03392";
export const RegisterToResearch = () => {

    useEffect(() => {
        getAll(token).then(data => {
            setResearchs(data);
        });
    }, []);


    const [selectedResearch, setSelectedResearch] = useState(null);
    const [researchs, setResearchs] = useState(null);

    const onAssign = async () => {
        const vla = await assign(token,"6","1")
        console.log(vla)
    }

    const onResearchChange = (e) => {
        setSelectedResearch(e.value);
    }

    return (
        <div  className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                <h5>Select a research</h5>
                <Dropdown value={selectedResearch} options={researchs} onChange={onResearchChange} optionLabel="name" placeholder="Select a research" />
                <Button onClick={onAssign} label="Register To Research" className="p-button-rounded"/>
                </div> 
            </div>       
        </div>
    );
}
