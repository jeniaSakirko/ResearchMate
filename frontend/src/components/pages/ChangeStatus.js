
import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import '../css/ChangeStatus.css';

export const ChangeStatus = () => {

    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [selectedCity2, setSelectedCity2] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedGroupedCity, setSelectedGroupedCity] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);

    let loadLazyTimeout = useRef(null);

    const cities = [
        { name: 'active', code: '1' },
        { name: 'done', code: '2' },
        { name: 'didnt finish', code: '3' },
        { name: 'on hold', code: '4' },
        { name: 'pre active', code: '5' }
    ];

    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

    return (
        <div className="dropdown-demo">
            <div className="card">
                <h5>Change status</h5>
                <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a status" />

            </div>
        </div>
    );
}
                 