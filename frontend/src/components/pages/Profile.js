import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useParams} from "react-router-dom";
import {Splitter, SplitterPanel} from 'primereact/splitter';
import {Dropdown} from "primereact/dropdown";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import {
    getParticipant,
    getParticipantResearchHistory,
    disableParticipant,
    enableParticipant,
    UpdateParticipant
} from "../api/participant";
import {assign, getAll, unassign} from "../api/research";
import {getUserType} from "../common/UserContext";
import "../css/DataTable.css"

export const Profile = () => {
    const {participantId} = useParams()
    const [userInfoTbl, setUserInfoTbl] = useState([]);
    const [selectedResearch, setSelectedResearch] = useState(null);
    const [availableResearches, setAvailableResearches] = useState(null);
    const [userProfileLoading, setUserProfileLoading] = useState(true);
    const [editingRows, setEditingRows] = useState({});
    const [isResearcher, setIsResearcher] = useState(true);
    const [pastResearch, setPastResearch] = useState([]);
    const [inResearch, setInResearch] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [disableUpdate, setDisableUpdate] = useState(false);
    let currentResearch = ""


    useEffect(() => {
        reloadParticipantInfo().then(() => {
            getAll().then(data => {
                setAvailableResearches(data);
                for (const res of data) {
                    if (currentResearch === res.name) {
                        setSelectedResearch(res);
                        setInResearch(true);
                    }
                }
            });
        });
    }, [])

    const reloadParticipantInfo = async () => {
        return getParticipant(participantId).then(data => {
            setIsActive(data.base_user?.user.is_active);
            generateUserInfoTable(data).then(userInfo => {
                getParticipantResearchHistory(participantId, "all").then(data => {
                    getUserType().then(res => {
                        if (res.toLowerCase() === "participant") {
                            setIsResearcher(false);
                        }
                        setUserProfileLoading(false);
                    });
                    updateUserInfoTableResearch(userInfo, data);
                    updateUserPastResearches(data);
                });
            });
        });
    }

    const generateUserInfoTable = async (data) => {
        let userInfo = []
        userInfo.push({id: userInfo.length + 1, key: "Username", value: data.base_user?.user.username});
        userInfo.push({id: userInfo.length + 1, key: "Emil", value: data.base_user?.user.email});
        userInfo.push({id: userInfo.length + 1, key: "First Name", value: data.base_user?.user.first_name});
        userInfo.push({id: userInfo.length + 1, key: "Last Name", value: data.base_user?.user.last_name});
        userInfo.push({id: userInfo.length + 1, key: "Phone", value: data.base_user?.phone_number});
        return userInfo;
    }

    const updateUserInfoTableResearch = async (userInfo, data) => {
        for (const res of data) {
            if (res.status.toLocaleString() === "Assigned" || res.status.toLocaleString() === "In Progress") {
                userInfo.push({id: userInfo.length + 1, key: "Research", value: res.name + " (" + res.status + ")"})
                setSelectedResearch(res.name);
                currentResearch = res.name;
            }
        }
        setUserInfoTbl(userInfo);
    }

    const updateUserPastResearches = async (data) => {
        let pastInfo = []
        for (const res of data) {
            if (res.status.toLocaleString() === "Done" || res.status.toLocaleString() === "Drop") {
                pastInfo.push({id: pastInfo.length + 1, name: res.name, status: res.status})
            }
        }
        setPastResearch(pastInfo);
    }
    const OnDisableParticipant = async () => {
        disableParticipant(participantId).then(() => {
            reloadParticipantInfo();
        })
    }
    const OnEnableParticipant = async () => {
        enableParticipant(participantId).then(() => {
            reloadParticipantInfo();
        })
    }

    const onResearchChange = (e) => {
        setSelectedResearch(e.value);
    }

    const onAssign = async () => {
        assign(participantId, selectedResearch.id).then(() => {
            reloadParticipantInfo();
            setInResearch(true);
        });
    }

    const onUnAssign = async () => {
        unassign(participantId, selectedResearch.id).then(() => {
            reloadParticipantInfo();
            setSelectedResearch(null);
            setInResearch(false);
        })
    }

    const onUpdate = async () => {
        let username;
        let first_name;
        let last_name;
        let email;
        let phone_number;
        for (const entry of userInfoTbl) {
            if (entry.key == "Username") {
                username = entry.value;
            } else if (entry.key == "First Name") {
                first_name = entry.value;
            } else if (entry.key == "Last Name") {
                last_name = entry.value;
            } else if (entry.key == "Emil") {
                email = entry.value;
            } else if (entry.key == "Phone") {
                phone_number = entry.value;
            }
        }
        await UpdateParticipant(participantId, username, email, first_name, last_name, phone_number);
    }

    const onRowEditComplete = (e) => {
        let _userInfoTbl = [...userInfoTbl];
        let {newData, index} = e;

        _userInfoTbl[index] = newData;

        setUserInfoTbl(_userInfoTbl);
    }

    const onRowEditChange = (e) => {
        if (Object.keys(e.data).length === 0) {
            setDisableUpdate(false);
        } else {
            setDisableUpdate(true);
        }
        setEditingRows(e.data);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} style={{width: "100%"}}
                          onChange={(e) => options.editorCallback(e.target.value)}/>;
    }

    return (

        <div className="card">

            <Splitter style={{height: '740px'}}>
                <SplitterPanel className="flex flex-column align-items-center justify-content-center gap-3" size={80}
                               minSize={20}>
                    <h3 className="align-items-center">Profile Info</h3>
                    <DataTable className="p-datatable-user-profile noHeader" value={userInfoTbl}
                               style={{width: "100%"}}
                               editMode="row" dataKey="id"
                               loading={userProfileLoading} emptyMessage="No user info found."
                               size="large" responsiveLayout="scroll" editingRows={editingRows}
                               onRowEditChange={onRowEditChange}
                               onRowEditComplete={onRowEditComplete}>
                        <Column field="key" header="key" style={{border: "none"}}/>
                        <Column field="value" header="value" editor={(options) => textEditor(options)}
                                style={{border: "none"}}/>
                        <Column rowEditor headerStyle={{width: '10%', minWidth: '8rem'}}
                                bodyStyle={{textAlign: 'center'}} hidden={isResearcher} style={{border: "none"}}/>
                    </DataTable>

                    <div>
                        <Button style={{display: (isResearcher ? 'none' : 'block')}} onClick={onUpdate} label="update"
                                className="p-button-rounded" disabled={disableUpdate}/>
                        <Button hidden={(!isActive || !isResearcher)} onClick={OnDisableParticipant}
                                label="Disable User" className="p-button-rounded"/>
                        <Button hidden={isActive} onClick={OnEnableParticipant}
                                label="Enable User" className="p-button-rounded"/>
                    </div>
                </SplitterPanel>

                <SplitterPanel size={80}>
                    <Splitter layout="vertical">
                        <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={5}>
                            <div className="flex flex-column align-items-center justify-content-center gap-3"
                                 style={{width: '100%'}}>
                                <h3 className="align-items-center">Past Researches</h3>
                                <DataTable value={pastResearch} scrollable scrollHeight="400px"
                                           loading={userProfileLoading} style={{width: "100%"}}
                                           emptyMessage="No past research were taken.">
                                    <Column field="name" header="Name" style={{minWidth: '200px'}}/>
                                    <Column field="status" header="Status" style={{minWidth: '200px'}}/>
                                </DataTable>
                            </div>
                        </SplitterPanel>

                        <SplitterPanel style={{display: (isResearcher ? 'block' : 'none')}}
                                       className={`${isResearcher ? "flex align-items-center justify-content-center" : ""}`}
                                       size={20} minSize={5}>
                            <div className="flex flex-column align-items-center justify-content-center gap-3 m-3">
                                <h3>Select a research</h3>
                                <Dropdown value={selectedResearch} options={availableResearches}
                                          onChange={onResearchChange}
                                          optionLabel="name" placeholder="Select a research"/>
                                <div className="gap-2">
                                    <Button onClick={onAssign} label="Register To Research"
                                            className="p-button-rounded" hidden={inResearch}/>
                                    &emsp;
                                    <Button onClick={onUnAssign} label="Cancel Register To Research"
                                            className="p-button-rounded" hidden={!inResearch}/>
                                </div>
                            </div>
                        </SplitterPanel>
                    </Splitter>
                </SplitterPanel>
            </Splitter>
        </div>
    );
}



