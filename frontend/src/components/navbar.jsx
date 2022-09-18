import React,{useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { setAuthStatus } from "../store/actions";
import styles from '../stylemodules/generalStyle.module.css';
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { NavCont,Pera } from "../styled/navbar.styled";

export const Navbar=()=>{
   const toast=useToast();
   const {authstatus}=useSelector((state)=>state);
   const dispatch=useDispatch();
  //  console.log(authstatus,"authstatus from redux");
   const navigate=useNavigate();

   const localStatus=JSON.parse(localStorage.getItem('authstatus'));

    useEffect( ()=>{
        if(localStatus){
            dispatch(setAuthStatus(localStatus));
          }
    },[])

    const handleLogout=()=>{
     localStorage.setItem('authstatus',JSON.stringify({status:false,token:0}));
     dispatch(setAuthStatus({status:false,token:0}));
     navigate('/login');
     handleToast()
    }

const handleToast=()=>{
    toast({
      title: "Logged out succesfully",
      status: 'success',
      duration: 3000,
      position:'top',
      isClosable: true,
    })
  }
  
    return (<>
    <NavCont>
        <Link to="/" className={styles.textDecoration}><Pera >Home</Pera></Link>
        {!authstatus? (<Link to="/login" className={styles.textDecoration}><Pera>Login</Pera></Link>) : 
        (<Pera onClick={handleLogout}>Logout</Pera>)}
        {!authstatus && <Link to="/signup" className={styles.textDecoration}><Pera>Signup</Pera></Link>}
    </NavCont>
    </>)
}
