import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';


import {Login} from './components/pages/Login';
import {UserContext} from "./components/common/UserContext";
import {useMemo, useState} from "react";
import {Test} from "./components/pages/test";


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
                        <Route path='/test' element={<Test/>} exact/>
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
