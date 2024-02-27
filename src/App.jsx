import './App.css'

import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';

import Banner from "./components/Banner";
import LaudoGrid from './components/LaudoGrid';
import Login from './components/Login';
import TodoForm from "./components/TodoForm";
import { PrivateRoute } from './util/PrivateRoute';
import { useLocalState } from './util/useLocalState';

function App() {

    const url = import.meta.env.VITE_REACT_APP_API_URL + "/";

    axios.defaults.withCredentials = true;

    const [auth, setAuth] = useLocalState(false,"auth");
    const [messageError, setMessageError] = useState("");

    const handleAuth = (state) => {
        setAuth(state);
    }

    useEffect(() => {
        axios.get(url)
        .then(res => {
            if(res.data.Status === "Sucesso"){
                setAuth(true);
            } else {
                setAuth(false);
                setMessageError(res.data.Error);
                console.log(messageError);
            }
        })
        .then(err => console.log(err));
    },[]);

    return (
        <div className="App">
            <Banner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute auth={auth} url={url} handleAuth={handleAuth}>
                            <TodoForm url={url} handleAuth={handleAuth}/>
                        </PrivateRoute>
                    }></Route>
                    <Route path="/laudos" element={
                        <PrivateRoute auth={auth}>
                            <LaudoGrid url={url} handleAuth={handleAuth}/>
                        </PrivateRoute>
                    }></Route>
                    <Route path="/login" element={<Login url={url} handleAuth={handleAuth}/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App