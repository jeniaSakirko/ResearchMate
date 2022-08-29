import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect, useMemo, useState} from "react";

import './App.css';

import {UserContext} from "./components/common/UserContext";
import {Test} from "./components/pages/test";
import {Login} from './components/pages/Login';
import {Register} from './components/pages/Register';
import {LandingPage} from "./components/pages/LandingPage";
import {ParticipantTable} from "./components/pages/ParticipantTable";
import {FormTable} from "./components/pages/FormTable";
import {ChangeStatus} from './components/pages/ChangeStatus';
import {RegisterToResearch} from './components/pages/RegisterToResearch';
import {MenubarNav} from './components/pages/MenubarNav';
import {RegisterNew} from './components/pages/RegisterNew';

function App() {
    return (
        // <div id="app">
            <div>
            <Router>
                <UserContext.Provider>
                    {<MenubarNav/>}
                    <Routes>
                        <Route path='/' element={<LandingPage/>} exact/>
                        <Route path='/login' element={<Login/>} exact/>
                        <Route path='/register' element={<Register/>} exact/>
                        <Route path='/test' element={<Test/>} exact/>
                        <Route path='/list' element={<ParticipantTable/>} exact/>
                        <Route path='/forms' element={<FormTable/>} exact/>
                        <Route path='/changestatus' element={<ChangeStatus/>} exact/>
                        <Route path='/registertoresearch' element={<RegisterToResearch/>} exact/>
                        <Route path='/registernew' element={<RegisterNew/>} exact/>
                        {/*<Route path='*' element={<PageNotFound/>} exact/>*/}

                    </Routes>
                </UserContext.Provider>
            </Router>

            {/*<Footer/>*/}
        </div>
    );
}

export default App;
