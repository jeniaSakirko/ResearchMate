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

import "../css/DataTable.css"

import {Link} from 'react-router-dom';
import {login} from "../api/auth";
import {Navigate} from 'react-router-dom';
//####
import myData from "./customers-large-backend.json";
import '../css/OrderListDemo.css';
//####
import {getUserType} from "../common/UserContext";
import {useEffect} from 'react';

export const Profile = () => {
    const {participantId} = useParams()
    const [userInfoTbl, setUserInfoTbl] = useState([]);
    const [selectedResearch, setSelectedResearch] = useState(null);
    const [availableResearches, setAvailableResearches] = useState(null);
    const [userProfileLoading, setUserProfileLoading] = useState(true);
    const [editingRows, setEditingRows] = useState({});
    const [hideEditBtn, setHideEditBtn] = useState(true);
    const [pastResearch, setPastResearch] = useState([]);



    const [isParticipant, setParticipant] = useState('');

    const checkIfParticipant = () => {
        // let newItem = false;
        // let icon = "pi pi-eye"
        // let className = "p-button-success"
        if (getUserType.value == "Researcher") {
            setParticipant(false);
        }
        if (getUserType.value == "Participant") {
            setParticipant(true);
        }
        // return <Button type="button" onClick={() => showFullDialog(rowData, newItem)} icon={icon}
        //                className={className}></Button>;
    }
    

    // const [isParticipant, setParticipant] = useState('');
    const [items, setItems] = useState('');
    useEffect(() => {
        getUserType().then(userType => {selectRole(userType);
        
        });
    }, []);

    const selectRole = (userType) => {
        if (userType && userType.toLowerCase() === "researcher") {
            setItems(resaercherProfile);
        } else if (userType && userType.toLowerCase() === "participant") {
            setItems(participantProfile);
        } else {
            setItems([]);
        }
    };

    const resaercherProfile = [
     console.log ("resaercherrrrrrrrrrrrrrrrrrrrrrrr")

    ];

    const participantProfile = [
        console.log ("participanttttttttttttttttttt")

    ];
//########################################################################################































    // const checkIfParticipant = () => {
    //     // let newItem = false;
    //     // let icon = "pi pi-eye"
    //     // let className = "p-button-success"
    //     if (getUserType.value == "Researcher") {
    //         setParticipant(false);
    //     }
    //     if (getUserType.value == "Participant") {
    //         setParticipant(true);
    //     }
    //     // return <Button type="button" onClick={() => showFullDialog(rowData, newItem)} icon={icon}
    //     //                className={className}></Button>;
    // }
    
    // useEffect(() => {
    //     checkIfParticipant();
    //     // useEffect().then()
    // }, []);



//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################
//########################################################################################

    // console.log (myData)
    const currentUser = myData[0];
    // console.log (currentUser);

    useEffect(() => {
        getParticipant(participantId).then(data => {
            generateUserInfoTable(data).then(userInfo => {
                getParticipantResearchHistory(participantId, "all").then(data => {
                    getUserType().then(res => {
                        if (res.toLowerCase() === "participant") {
                            setHideEditBtn(false);
                        }
                        setUserProfileLoading(false);
                    });
                    updateUserInfoTableResearch(userInfo, data);
                    updateUserPastResearches(data);
                });
            });
        });
        getAll().then(data => {
            setAvailableResearches(data);
        });

    }, [])

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

    const onRowEditComplete = (e) => {
        let _userInfoTbl = [...userInfoTbl];
        let {newData, index} = e;

        _userInfoTbl[index] = newData;

        setUserInfoTbl(_userInfoTbl);
    }

    const onRowEditChange = (e) => {
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
                                bodyStyle={{textAlign: 'center'}} hidden={hideEditBtn} style={{border: "none"}}/>
                    </DataTable>

                    <div>
                        <Button onClick={onSuspendUser} label="Suspend User" className="p-button-rounded"/>
                        <Button onClick={onDisable} label="Disable User" className="p-button-rounded"/>
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



