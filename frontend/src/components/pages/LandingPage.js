import React from 'react';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';


export const LandingPage = () => {
    const navigate = useNavigate();

    const onLogin = async () => {
        let path = `/login`;
        navigate(path);
    }

    const onRegister = async () => {
        let path = `/register`;
        navigate(path);
    }

    return (
        <div className="flex justify-content-center aligned-items-center vertical-align-middle">
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                    <h3 className="align-items-center">Landing Page</h3>
                    <div className="m-2 flex flex-row align-items-center justify-content-center gap-2">
                        <Button onClick={onLogin} label="Login" className="p-button-rounded"/>
                        <Button onClick={onRegister} label="Register" className="p-button-rounded"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
