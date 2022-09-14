import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import {login} from "../api/auth";
import {Navigate} from 'react-router-dom';
import {participantInfo} from '../api/participant'
import {getUserToken, getUserType} from "../common/UserContext";

import {Dialog} from 'primereact/dialog';
import {ProgressSpinner} from "primereact/progressspinner";


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userToken, setUserToken] = useState('');
    const [navPath, setNavPath] = useState('');
    const [hideSpinner, setHideSpinner] = useState(true);

    useEffect(() => {
        getUserToken().then(token => {
            setUserToken(token);
            getUserType().then(type => {
                getNavPath(type).then(path => {
                    setNavPath(path)
                })
            });
        });
    });

    const getNavPath = async (userType) => {
        let navigatePath = "";

        if (userType && userType.toLowerCase() === "researcher") {
            navigatePath = "/participants/";
        } else if (userType && userType.toLowerCase() === "participant") {
            await participantInfo().then(data1 => {
                navigatePath = "/participants/" + data1.user.id;
            });
        }
        return navigatePath;
    };

    const [showMessage1, setShowMessage1] = useState(false);
    const onLogin = async () => {
        setHideSpinner(false);
        const data = await login(username, password);
        if (typeof data !== 'undefined') {
            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);

            localStorage.setItem("userType", data.user.type);
            window.location = await getNavPath(data.user.type);
        } else {
            setShowMessage1(true);
        }
    }
    const dialogFooter1 = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"
                                                                               autoFocus
                                                                               onClick={() => setShowMessage1(false)}/>
    </div>;
    return (

        <div className="flex justify-content-center aligned-items-center vertical-align-middle">
            {userToken ? <Navigate to={navPath}/> : null}
            <Dialog visible={showMessage1} onHide={() => setShowMessage1(false)} position="top" footer={dialogFooter1}
                    showHeader={false} breakpoints={{'960px': '80vw'}} style={{width: '30vw'}}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i style={{fontSize: '5rem', color: 'var(--green-500)'}}></i>
                    <h5>Oops! Username or password incorrect </h5>
                    <p style={{lineHeight: 1.5, textIndent: '1rem'}}>
                    </p>
                </div>
            </Dialog>
            <ProgressSpinner hidden={hideSpinner}/>

            <div className="card" hidden={!hideSpinner}>
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 ">
                    <h3 className="align-items-center">Login</h3>
                    <span className="p-input-icon-left">
                        <i className="pi pi-user"/>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)}
                                   placeholder="Username"/>
                    </span>

                    <span className="p-input-icon-left">
                        <i className="pi pi-lock"/>
                        <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Password"/>
                    </span>
                    <Button onClick={onLogin} label="Login" className="p-button-rounded"/>
                    <div>
                        <p>First time? <Link to="/register">Create an account</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
