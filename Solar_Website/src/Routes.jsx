import React, { Profiler } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';


const AppRoutes = () => {
    return (
        <main className="main">
            <Routes>
                <Route path="/" element={<Home />} />   
            </Routes>
        </main>


    );
};

export default AppRoutes;
