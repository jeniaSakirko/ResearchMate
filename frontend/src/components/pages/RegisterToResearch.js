import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import '../css/ChangeStatus.css';
import {getAll} from '../api/research';

export const RegisterToResearch = () => {

    useEffect(() => {
        getAll("59ca714afb64ff77038473bff47f2891e7984c6a10563dc78e2c7645aadeaf6e").then(data => {
            setResearchs(data);
        });
    }, []);

    const [selectedResearch, setSelectedResearch] = useState(null);
    const [researchs, setResearchs] = useState(null);

    const onResearchChange = (e) => {
        setSelectedResearch(e.value);
    }

    return (
        <div className="dropdown-demo">
            <div className="card">
                <h5>Select a research</h5>
                <Dropdown value={selectedResearch} options={researchs} onChange={onResearchChange} optionLabel="name" placeholder="Select a research" />

            </div>
        </div>
    );
}
