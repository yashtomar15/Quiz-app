import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const RequiredAuth=({children})=>{
let {authstatus}=useSelector((state)=>state);
// console.log(authstatus,'from required auth');

return (
    <>
    {authstatus? (children) :(<><Navigate to={'/login'} /></>)}
    </>
)
}