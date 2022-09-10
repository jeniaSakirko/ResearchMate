import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {logout} from "../api/auth";
import {getUserToken, getUserType} from "../common/UserContext";


export const MenubarNav = () => {
    const [token, setToken] = useState('');
    const [items, setItems] = useState('');

    const onLogout = async () => {
        const data = await logout(token);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userType");
    }

    useEffect(() => {
        getUserToken().then(myToken => {
            setToken(myToken);
        })
            .then(() => {
                getUserType().then(userType => {
                    selectNav(userType);
                })
            });
    }, []);

    const selectNav = (userType) => {
        if (userType && userType.toLowerCase() === "researcher") {
            setItems(resaercherNav);
        } else if (userType && userType.toLowerCase() === "participant") {
            setItems(participantNav);
        } else {
            setItems([]);
        }
    };

    const resaercherNav = [
        {
            label: 'Research',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Lets see some of our research',
                    icon: 'pi pi-fw pi-users',
                    command: (e) => {
                        window.location = "/ResearchDataView"
                    }
                },
            ]
        },
        {
            label: 'Participant',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'participant List',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (e) => {
                        window.location = "/participants/"
                    }

                },
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: (e) => {
                onLogout().then(() => {
                    window.location = "/login"
                })
            }
        }
    ];

    const participantNav = [
        {
            label: 'Research',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Lets see some of our research',
                    icon: 'pi pi-fw pi-users',
                    command: (e) => {
                        window.location = "/ResearchDataView"
                    }
                },
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'profile page',
                    icon: 'pi pi-fw pi-user-plus',
                    command: (e) => {
                        window.location = "/participants/1"
                    }


                },
            ]
        },
        {
            label: 'Forms',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Forms Forms to signed',
                    icon: 'pi pi-fw pi-user-plus',
                    command: (e) => {
                        window.location = "/forms"
                    }


                },
            ]
        },
        {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: (e) => {
                onLogout().then(() => {
                    window.location = "/login"
                })
            }
        }
    ];


    const start = <img alt="logo" src="images/product/logo.jpg"
                       onError={(e) => e.target.src = 'https://blog.optimalworkshop.com/wp-content/uploads/2020/03/Qualitative-research-methods.png'}
                       height="40" className="mr-2"></img>;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start}/>
            </div>
        </div>
    );
}
                 