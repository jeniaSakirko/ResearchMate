import React, {useContext, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import {login} from "../api/auth";
import {Navigate} from 'react-router-dom';
//####
import myData from "./customers-large-backend.json";
// import { InputText } from 'primereact/inputtext';
import '../css/OrderListDemo.css';

// export const Login = () => {
export const Profile = () => {
    
    console.log (myData)
    const currentUser = myData[0];
    console.log (currentUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const onLogin = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }

    const onSuspendUser = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }

    const onDisable = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }

    const onAssign = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }

    const onUnAssign = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }

    const onUpdateMeeting = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }

    const onComment = async () => {
        const data = await login(username, password);
        localStorage.setItem("userToken", data.token);
    }
    
    return (

        <div className="flex justify-content-center aligned-items-center vertical-align-middle"> {/* main div */}
            {/* TODO: uncomment! {userToken ? <Navigate to="/test/"/> : null}*/}
            <div className="card" style={{borderColor: "white"}}>

                {/* start of blue */}
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 " style={{borderColor: "blue"}}>
                    <h3 className="align-items-center">Profile Information</h3>

                    <span className="p-input-icon-left">
                        <label>Username</label> &emsp;
                    <InputText value={currentUser.base_user.user.username} disabled={true} type="text" placeholder="Username" id="username" />
                    </span>

                    <span className="p-input-icon-left">
                    <label>Email</label> &emsp;
                    <InputText value={currentUser.base_user.user.email} disabled={true} type="text" placeholder="Email" id="username" />
                    </span>

                    <span className="p-input-icon-left">
                    <label>FirstName</label> &emsp;
                    <InputText value={currentUser.base_user.user.first_name} disabled={true} type="text" placeholder="FirstName" id="username" />
                    </span>

                    <span className="p-input-icon-left">
                    <label>LastName</label> &emsp;
                    <InputText value={currentUser.base_user.user.last_name} disabled={true} type="text" placeholder="LastName" id="username" />
                    </span>
            
                    <span className="p-input-icon-left">
                    <label>PhoneNumber</label> &emsp;
                    <InputText value={currentUser.base_user.phone_number} disabled={true} type="text" placeholder="PhoneNumber" id="username" />
                    </span>

                    <Button onClick={onSuspendUser} label="Suspend User" className="p-button-rounded"/>

                    <Button onClick={onDisable} label="Disable User" className="p-button-rounded"/> 
                    <br></br>
                </div>  {/* end of blue */}
                                

            </div> {/* end of red */}


            <div className="card" style={{borderColor: "white"}}>

                {/* start of blue */}
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 " style={{borderColor: "blue"}}>
                                    <h3 className="align-items-center">Past Researches</h3>

                                    <span className="p-input-icon-left">
                                        <label>*list of past researches.....*</label> &emsp;
                                    </span>

                                    <br></br>
                                </div>  {/* end of blue */}

                {/* start of blue */}
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 " style={{borderColor: "blue"}}>
                                    <h3 className="align-items-center">Assign Research</h3>

                                    <span className="p-input-icon-left">
                                        <label>*list of researches.....*</label> &emsp;
                                    </span>
                                    <Button onClick={onAssign} label="Assign" className="p-button-rounded"/>

                                    <Button onClick={onUnAssign} label="UnAssign" className="p-button-rounded"/> 
                                    <br></br>
                                </div>  {/* end of blue */}

                {/* start of blue */}
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 " style={{borderColor: "blue"}}>
                                    <h3 className="align-items-center">Update A Meeting</h3>

                                    <Button onClick={onUpdateMeeting} label="Update Meeting" className="p-button-rounded"/>

                                    <br></br>
                                </div>  {/* end of blue */}

                {/* start of blue */}
                <div className="flex flex-column align-items-center justify-content-center card-container gap-3
                                surface-overlay border-round border-1 shadow-1 p-5 py-0 m-3 " style={{borderColor: "blue"}}>
                                    <h3 className="align-items-center">Add A Comment</h3>

                                    <Button onClick={onComment} label="Add A Comment" className="p-button-rounded"/>

                                    <br></br>
                                </div>  {/* end of blue */}



            </div> {/* end of red */}




        </div> 
    );
}



