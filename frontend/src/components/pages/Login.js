import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';



export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex justify-content-center aligned-items-center vertical-align-middle" style={{
            marginTop: "35%"
        }}>
            <div className="card">
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                    <h3 className="align-items-center">Login</h3>
                    <span className="p-input-icon-left">
                        <i className="pi pi-user"/>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                    </span>

                    <span className="p-input-icon-left">
                        <i className="pi pi-lock"/>
                        <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Password"/>
                    </span>
                    <Button label="Login" className="p-button-rounded"/>
                    <div>
                        <p>First time? <Link to="/register">Create an account</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
