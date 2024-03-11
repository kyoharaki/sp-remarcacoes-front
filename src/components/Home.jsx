import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleGoToRemarcar = () => {
        navigate("/form");
    }
    const handleGoToLaudos = () => {
        navigate("/laudos");
    }
    return (
        <div>
            <h1>Aguardando informações.</h1>
            <button className="btn btn-primary btn-sm" onClick={handleGoToRemarcar}>Remarcar</button>
            <button className="btn btn-primary btn-sm" onClick={handleGoToLaudos}>Laudos</button>
        </div>
    );
};

export default Home;