import {Menubar} from 'primereact/menubar';
import React, {useState, useEffect} from 'react';
import {logout} from "../api/auth";
import {participantInfo} from '../api/participant'
import {getUserToken, getUserType} from "../common/UserContext";

var id = 0;
var varFullName = '';

export const MenubarNav = () => {
    const [token, setToken] = useState('');
    const [items, setItems] = useState('');
    const [fullName, setFullName] = useState('');

    const onLogout = async () => {
        logout(token);
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
            participantInfo().then(data => {
                id = (data.user.id);
                varFullName = data.user.base_user.user.first_name + " " + data.user.base_user.user.last_name;
                setFullName(varFullName);
            });
        } else {
            setItems([]);
        }
    };

    const resaercherNav = [
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

    const participantNav = [
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'profile page',
                    icon: 'pi pi-fw pi-user-plus',
                    command: (e) => {
                        window.location = "/participants/" + id
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
     const end = <label>Hello {varFullName}!</label>

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} end={end}/>
            </div>
        </div>
    );
}
                 