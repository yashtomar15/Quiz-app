import {Routes,Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/login';
import { Signup } from './components/signup';

export const MainRouter=()=>{
    return (<>
    <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
    </Routes>
    </>)
}