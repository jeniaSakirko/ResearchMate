import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useParams} from "react-router-dom";
import {Splitter, SplitterPanel} from 'primereact/splitter';

import {getUserToken} from "../common/UserContext";
import {getParticipant} from "../api/participant";

export const Profile = () => {
    const {participantId} = useParams()
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        getUserToken().then(token => {
            getParticipant(token, participantId).then(data => {
                setCurrentUser(data);
                console.log(data);
            })
        });
    }, [])

    const onSuspendUser = async () => {
        console.log("onSuspendUser");
    }

    const onDisable = async () => {
        console.log("onDisable");
    }

    const onAssign = async () => {
        console.log("onAssign");
    }

    const onUnAssign = async () => {
        console.log("onUnAssign");
    }

    const onUpdateMeeting = async () => {
        console.log("onUpdateMeeting");
    }

    const onComment = async () => {
        console.log("onComment");
    }

    return (
        <div className="card">
            <Splitter style={{height: '740px'}}>
                <SplitterPanel className="flex flex-column align-items-center justify-content-center gap-3" size={80}
                               minSize={20}>
                    <h3 className="align-items-center">Profile Information</h3>
                    <span className="p-input-icon-left">
                        <label>Username</label> &emsp;
                        <InputText value={currentUser.base_user?.user.username} disabled={true} type="text"
                                   placeholder="Username" id="username"/>
                        </span>

                    <span className="p-input-icon-left">
                         <label>Email</label> &emsp;
                        <InputText value={currentUser.base_user?.user.email} disabled={true} type="text"
                                   placeholder="Email" id="email"/>
                        </span>

                    <span className="p-input-icon-left">
                         <label>First Name</label> &emsp;
                        <InputText value={currentUser.base_user?.user.first_name} disabled={true} type="text"
                                   placeholder="First Name" id="fName"/>
                        </span>

                    <span className="p-input-icon-left">
                         <label>Last Name</label> &emsp;
                        <InputText value={currentUser.base_user?.user.last_name} disabled={true} type="text"
                                   placeholder="Last Name" id="lName"/>
                        </span>
                    <span className="p-input-icon-left">
                         <label>Phone Number</label> &emsp;
                        <InputText value={currentUser.base_user?.phone_number} disabled={true} type="text"
                                   placeholder="Phone Number" id="phone"/>
                        </span>
                    <div>
                        <Button onClick={onSuspendUser} label="Suspend User" className="p-button-rounded"/>
                        <Button onClick={onDisable} label="Disable User" className="p-button-rounded"/>
                    </div>
                </SplitterPanel>
                <SplitterPanel size={80}>
                    <Splitter layout="vertical">
                        <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={5}>
                            <div className="flex flex-column align-items-center justify-content-center gap-3">
                                <h3 className="align-items-center">Past Researches</h3>
                                <span className="p-input-icon-left">
                                    <label>*list of past researches.....*</label> &emsp;
                                </span>
                            </div>
                        </SplitterPanel>

                        <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={5}>
                            <div className="flex flex-column align-items-center justify-content-center gap-3">
                                <h3 className="align-items-center">Assign Research</h3>
                                <span className="p-input-icon-left">
                                    <label>*list of researches.....*</label> &emsp;
                                </span>
                                <div className="p-2">
                                    <Button onClick={onAssign} label="Assign" className="p-button-rounded"/>
                                    <Button onClick={onUnAssign} label="UnAssign" className="p-button-rounded"/>
                                </div>
                            </div>
                        </SplitterPanel>

                        <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={5}>
                            <div className="flex flex-column align-items-center justify-content-center gap-3">
                                <h3 className="align-items-center">Update A Meeting</h3>
                                <Button onClick={onUpdateMeeting} label="Update Meeting" className="p-button-rounded"/>
                            </div>
                        </SplitterPanel>

                        <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={5}>
                            <div className="flex flex-column align-items-center justify-content-center gap-3">
                                <h3 className="align-items-center">Add A Comment</h3>
                                <Button onClick={onComment} label="Add A Comment" className="p-button-rounded"/>
                            </div>
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter>
        </div>
    );
}



