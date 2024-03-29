import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';

import {UserContext} from "./components/common/UserContext";
import {Login} from './components/pages/Login';
import {RegisterOld} from './components/pages/RegisterOld';
import {ParticipantTable} from "./components/pages/ParticipantTable";
import {FormTable} from "./components/pages/FormTable";
import {ChangeStatus} from './components/pages/ChangeStatus';
import {RegisterToResearch} from './components/pages/RegisterToResearch';
import {MenubarNav} from './components/pages/MenubarNav';
import {Register} from './components/pages/Register';
import {RegisterNew} from './components/pages/RegisterNew';
import {Profile} from "./components/pages/Profile";
import {ResearchDataView} from "./components/pages/ResearchDataView";



function App() {
    return (
        // <div id="app">
        <div>
            <BrowserRouter>
                <UserContext.Provider>
                    {<MenubarNav/>}
                    <Routes>
                        <Route path='/' element={<Login/>} exact/>
                        <Route path='/login' element={<Login/>} exact/>
                        <Route path='/register' element={<Register/>} exact/>
                        <Route path='/register' element={<RegisterOld/>} exact/>
                        <Route path="/participants" element={<ParticipantTable/>}/>
                        <Route path="/participants/:participantId" element={<Profile/>}/>
                        <Route path='/forms' element={<FormTable/>} exact/>
                        <Route path='/changestatus' element={<ChangeStatus/>} exact/>
                        <Route path='/registertoresearch' element={<RegisterToResearch/>} exact/>
                        <Route path='/registernew' element={<RegisterNew/>} exact/>
                        <Route path='/profile' element={<Profile/>} exact/>
                        <Route path='/researchdataview' element={<ResearchDataView/>} exact/>
                        <Route
                            path="*"
                            element={
                                <main style={{padding: "1rem"}}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>

            {/*<Footer/>*/}
        </div>
    );
}

export default App;
