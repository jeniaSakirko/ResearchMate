
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import {Link, Navigate} from "react-router-dom";
import {Button} from "primereact/button";
import {register} from "../api/participant";

export const RegisterOld = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const onRegister = async () => {
        const vla = await register(username, password, email, firstName, lastName, phone)
        console.log(vla)
    }

    return (
        <div className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-2
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                    <h3 className="align-items-center">RegisterOld</h3>
                    <div>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)}
                                   type="text" className="block mb-2" placeholder="Username" />
                        <InputText value={password} onChange={(e) => setPassword(e.target.value)}
                                   type="text" className="block mb-2" placeholder="Password" />
                        <InputText value={email} onChange={(e) => setEmail(e.target.value)}
                                   type="text" className="block mb-2" placeholder="Email" />
                        <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                   type="text" className="block mb-2" placeholder="First Name" />
                        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)}
                                   type="text" className="block mb-2" placeholder="Last Name" />
                        <InputText value={phone} onChange={(e) => setPhone(e.target.value)}
                                   type="text" className="block mb-2" placeholder="Phone Number" />
                    </div>
                    <Button onClick={onRegister} label="RegisterOld" className="p-button-rounded"/>
                </div>
            </div>
        </div>
    )
}
