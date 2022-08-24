
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import {Link, Navigate} from "react-router-dom";
import {Button} from "primereact/button";
import {register} from "../api/participant";
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';


export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const validate = (data) => {
        let errors = {};

        if (!data.username) {
            errors.username = 'username is required.';
        }
        if (!data.password) {
                    errors.password = 'Password is required.';
                }
        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
        if (!data.firstName) {
            errors.firstName = 'first Name is required.';
        }
        if (!data.lastName) {
            errors.lastName = 'last Name is required.';
        }
        if (!data.phone) {
            errors.phone = 'phone is required.';
        }
        return errors;
    };


    const onRegister = async () => {
        setFormData(data);
        setShowMessage(true);
        const vla = await register(username, password, email, firstName, lastName, phone)
        console.log(vla)
        form.restart();
    }

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
            <div className="flex align-items-center flex-column pt-6 px-3">
                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                <h5>Registration Successful!</h5>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                    Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                </p>
            </div>
        </Dialog>
        <div className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-2
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                    <h3 className="align-items-center">Register</h3>
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
                    <Button onClick={onRegister} label="Register" className="p-button-rounded"/>
                </div>
            </div>
        </div>
    </div>
    )
}
