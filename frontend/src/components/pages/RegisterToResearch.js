import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../css/ChangeStatus.css';
import {getAll,assign} from '../api/research';
import {Button} from 'primereact/button';
const token ="5d3a364c8096f0c6e167f763e58464793f008bdb3500044975dc3a98979a5e48";
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
        const vla = await assign(token,"9",selectedResearch.id)
        console.log(vla)
    }

  
    return (
        <div  className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                <h5>Select a research</h5>
                <Dropdown value={selectedResearch} options={researchs} onChange={onResearchChange} optionLabel="name" placeholder="Select a research" />
                <Button onClick={onAssign} label="RegisterOld To Research" className="p-button-rounded"/>
                </div> 
            </div>       
        </div>
    );
}
