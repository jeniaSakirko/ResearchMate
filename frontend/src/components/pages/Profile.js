import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useParams} from "react-router-dom";
import {Splitter, SplitterPanel} from 'primereact/splitter';
import {Dropdown} from "primereact/dropdown";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import {getParticipant, getParticipantResearchHistory} from "../api/participant";
import {assign, getAll, unassign} from "../api/research";
import {getUserType} from "../common/UserContext";

export const Profile = () => {
    const {participantId} = useParams()
    const [currentUser, setCurrentUser] = useState('');
    const [userInfoTbl, setUserInfoTbl] = useState('');
    const [selectedResearch, setSelectedResearch] = useState(null);
    const [availableResearches, setAvailableResearches] = useState(null);
    const [userResearches, setUserResearches] = useState(null);
    const [userProfileLoading, setUserProfileLoading] = useState(true);
    const [userType, setUserType] = useState(true);
    const [editingRows, setEditingRows] = useState({});


    useEffect(() => {
        getParticipant(participantId).then(data => {
            updateUserInfoTable(data).then(() => {
                getParticipantResearchHistory(participantId, "all").then(data => {
                    setUserResearches(data);
                    getUserType().then(res => {
                        if (res.toLowerCase() === "participant") {
                            let _editingRows = {...editingRows, ...{[`1`]: true}};
                            setEditingRows(_editingRows);
                        }
                    });
                });
            });
            setUserProfileLoading(false);
        });
        getAll().then(data => {
            setAvailableResearches(data);
        });

    }, [])

    const updateUserInfoTable = async (data) => {
        let userInfo = []

        userInfo.push({key: "Username", value: data.base_user?.user.username});
        userInfo.push({key: "Emil", value: data.base_user?.user.email});
        userInfo.push({key: "First Name", value: data.base_user?.user.first_name});
        userInfo.push({key: "Last Name", value: data.base_user?.user.last_name});
        userInfo.push({key: "Phone", value: data.base_user?.phone_number});
        setUserInfoTbl(userInfo);
    }

    const onSuspendUser = async () => {
        console.log("onSuspendUser");
    }

    const onDisable = async () => {
        console.log("onDisable");
    }

    const onUpdateMeeting = async () => {
        console.log("onUpdateMeeting");
    }

    const onComment = async () => {
        console.log("onComment");
    }

    const onResearchChange = (e) => {
        setSelectedResearch(e.value);
    }

    const onAssign = async () => {
        await assign(participantId, selectedResearch.id)
    }

    const onUnAssign = async () => {
        await unassign(participantId, selectedResearch.id)
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>;
    }

    const onRowEditChange = (e) => {
        setEditingRows(e.data);
    }

    const onRowEditComplete2 = (e) => {
        let _products3 = [...userInfoTbl];
        let { newData, index } = e;

        _products3[index] = newData;

        setUserInfoTbl(_products3);
    }


    return (
        <div className="card">
            <Splitter style={{height: '740px'}}>
                <SplitterPanel className="flex flex-column align-items-center justify-content-center gap-3" size={80}
                               minSize={20}>
                    <DataTable className="p-datatable-user-profile" value={userInfoTbl} style={{width: "100%"}}
                               rows={10}
                               dataKey="id"
                               loading={userProfileLoading}
                               emptyMessage="No user info found."
                               size="large" responsiveLayout="scroll"
                               editingRows={editingRows} onRowEditChange={onRowEditChange}
                               onRowEditComplete={onRowEditComplete2}>
                        <Column field="key" header="key"/>
                        <Column field="value" header="value" editor={(options) => textEditor(options)}/>
                    </DataTable>
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
                            <div className="flex flex-column align-items-center justify-content-center gap-3 m-3">
                                <h5>Select a research</h5>
                                <Dropdown value={selectedResearch} options={availableResearches}
                                          onChange={onResearchChange}
                                          optionLabel="name" placeholder="Select a research"/>
                                <div className="gap-2">
                                    <Button onClick={onAssign} label="Register To Research"
                                            className="p-button-rounded"/>
                                    <Button onClick={onUnAssign} label="Cancel Register To Research"
                                            className="p-button-rounded"/>
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



