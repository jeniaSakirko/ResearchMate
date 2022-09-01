import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../css/ChangeStatus.css';
import {getAll,assign,unassign} from '../api/research';
import {Button} from 'primereact/button';
const token ="5d9065cf8a1b554f1e79ce9b07e8b9017b79406427b91e35dee0d0a857d0fe54";
export const RegisterToResearch = () => {

    useEffect(() => {
        getAll(token).then(data => {
            setResearchs(data);
        });
    }, []);


    const [selectedResearch, setSelectedResearch] = useState(null);
    const [researchs, setResearchs] = useState(null);
    
    const onResearchChange = (e) => {
        setSelectedResearch(e.value);
    }

    const onAssign = async () => {
        const vla = await assign(token,"16",selectedResearch.id)
        console.log(vla)
    }

    const unAssign = async () => {
        const vla = await unassign(token,"16",selectedResearch.id)
        console.log(vla)
    }

  
    return (
        <div  className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                <h5>Select a research</h5>
                <Dropdown value={selectedResearch} options={researchs} onChange={onResearchChange} optionLabel="name" placeholder="Select a research" />
                <Button onClick={onAssign} label="Register To Research" className="p-button-rounded"/>
                <Button onClick={unAssign} label="Cancel Register To Research" className="p-button-rounded"/>
                </div> 
            </div>       
        </div>
    );
}
