import React,{useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { setAuthStatus } from "../store/actions";
import styled from 'styled-components';

const NavCont=styled.div`
width:100%;
height:40px;
background-color:#56508c;
color:white;
display:flex;
justify-content:space-between;
`
const Pera=styled.p`
color:white;
font-weight:600;
text-decoration:none;
&:hover{
    color:#f1c862;
}
`
export const Navbar=()=>{
   const {authstatus}=useSelector((state)=>state);
   const dispatch=useDispatch();
   console.log(authstatus,"authstatus from redux");

    useEffect(async ()=>{
    const localStatus=await JSON.parse('authstatus');
    if(localStatus){
        dispatch(setAuthStatus(localStatus));
    }
    },[])

    const handleLogout=()=>{
     localStorage.setItem({status:false,token:0})
     dispatch(setAuthStatus({status:false,token:0}));
    }
    return (<>
    <NavCont>
        {authstatus? <Link to="/home"><Pera>Home</Pera></Link>: <Link to="/"><Pera>Home</Pera></Link>} 
        {!authstatus? <Link to="/"><Pera>Login</Pera></Link>: <Pera onclick={handleLogout}>Logout</Pera>}
        {authstatus && <Link to="/signup"><Pera>Signup</Pera></Link>}
    </NavCont>
    </>)
}
