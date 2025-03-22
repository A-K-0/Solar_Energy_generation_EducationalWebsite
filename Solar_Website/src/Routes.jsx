import React, { Profiler } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Prediction from './pages/Prediction/Prediction'


const AppRoutes = () => {
    return (
        <main className="main">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/prediction" element={<Prediction />} />
                {/* <Route path="/Howtouse" element={<Howtouse />} />    */}
            </Routes>
        </main>


    );
};

export default AppRoutes;
