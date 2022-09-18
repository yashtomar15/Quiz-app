import React from 'react';
import {Routes,Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Result } from './components/result';
import { RequiredAuth } from './components/RequiredAuth';

export const MainRouter=()=>{
    
    return (<>
    <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<RequiredAuth> <Home /> </RequiredAuth>}> </Route>
        <Route path="/result" element={<Result />}></Route>
    </Routes>
    </>)
}