import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import {Login} from './components/pages/Login';


function App() {
    return (
        <div id="app">
            <Router>
                {/*<Navbar/>*/}
                <Routes>
                    {/*<Route path='/' element={<LandingPage/>} exact/>*/}
                    <Route path='/' element={<Login/>} exact/>
                    {/*<Route path='/signup' element={<Signup/>} exact/>*/}
                    {/*<Route path='/logout' element={<Logout/>} exact/>*/}
                    {/*<Route path='/list' element={<ListPage/>} exact/>*/}
                    {/**/}
                    {/*<Route path='*' element={<PageNotFound/>} exact/>*/}

                </Routes>
            </Router>
            {/*<Footer/>*/}
        </div>
    );
}

export default App;
