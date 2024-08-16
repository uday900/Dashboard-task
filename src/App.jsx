import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Context from './Context';

import SearchPage from './pages/SearchPage';
import SignUp from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Context>
                    <Navbar />
                    <Routes>
                        <Route path = '/' element = {<LandingPage />}/>
                        <Route path='/search/:query' element = {<SearchPage/>} />
                        <Route path='/signup' element = { <SignUp/> }/>
                        <Route path='/login' element = { <Login/> }/>
                        <Route path = '*' element = {<>Page not found</>} />
                    </Routes>
                    <Footer/>
                </Context>
            </BrowserRouter>
        </div>
    );
}

export default App;
