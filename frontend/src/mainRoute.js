import {Routes,Route} from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/login';
import { Signup } from './components/signup';

export const MainRouter=()=>{
    return (<>
    <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
    </Routes>
    </>)
}