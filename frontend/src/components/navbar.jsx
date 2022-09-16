import React,{useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { setAuthStatus } from "../store/actions";
import styled from 'styled-components';
import styles from '../stylemodules/generalStyle.module.css';

const NavCont=styled.div`
width:100%;
height:50px;
background-color:#56508c;
color:white;
display:flex;
justify-content:space-around;
`
const Pera=styled.p`
color:white;
font-weight:600;
text-decoration:none;
&:hover{
    color:#f1c862;
}
padding-top:10px;
`
export const Navbar=()=>{
   const {authstatus}=useSelector((state)=>state);
   const dispatch=useDispatch();
   console.log(authstatus,"authstatus from redux");

   const localStatus=JSON.parse(localStorage.getItem('authstatus'));

    useEffect( ()=>{
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
        {authstatus? (<Link to="/home" className={styles.textDecoration}><Pera>Home</Pera></Link>):
         (<Link to="/" className={styles.textDecoration}><Pera>Home</Pera></Link>)} 

        {!authstatus? (<Link to="/" className={styles.textDecoration}><Pera>Login</Pera></Link>) : 
        (<Pera onclick={handleLogout}>Logout</Pera>)}

        {!authstatus && <Link to="/signup" className={styles.textDecoration}><Pera>Signup</Pera></Link>}
    </NavCont>
    </>)
}
