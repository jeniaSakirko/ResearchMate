import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useMemo, useState} from "react";


import {UserContext} from "./components/common/UserContext";
import {Test} from "./components/pages/test";
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';
import {MenubarNav} from './components/pages/MenubarNav';
import {ChangeStatus} from './components/pages/ChangeStatus';


import './App.css';


function App() {
    const [userToken, setToken] = useState(null);
    const contextValue = useMemo(() => ({userToken, setToken}), [userToken, setToken]);


    return (
        <div id="app">
            <Router>
                <UserContext.Provider value={contextValue}>
                    {/*/*<Navbar/>*!/*/}
                    <Routes>
                        {/*<Route path='/' element={<LandingPage/>} exact/>*/}
                        <Route path='/' element={<Login/>} exact/>
                        <Route path='/register' element={<Register/>} exact/>
                        <Route path='/test' element={<Test/>} exact/>
                        <Route path='/menubarNav' element={<MenubarNav/>} exact/>
                        <Route path='/changestatus' element={<ChangeStatus/>} exact/>
                        {/*<Route path='/signup' element={<Signup/>} exact/>*/}
                        {/*<Route path='/logout' element={<Logout/>} exact/>*/}
                        {/*<Route path='/list' element={<ListPage/>} exact/>*/}
                        {/**/}
                        {/*<Route path='*' element={<PageNotFound/>} exact/>*/}

                    </Routes>
                </UserContext.Provider>
            </Router>

            {/*<Footer/>*/}
        </div>
    );
}

export default App;