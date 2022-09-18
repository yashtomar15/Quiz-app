import React ,{useState,useEffect} from "react";
import { Input , Stack,InputGroup, InputRightElement,Button, useToast} from '@chakra-ui/react'
import styles from '../stylemodules/generalStyle.module.css';
import { useNavigate ,useLocation} from "react-router-dom";
import axios from 'axios'; 
import { useDispatch,useSelector } from "react-redux";
import {setAuthStatus} from '../store/actions';
import { LoginCont,Heading } from "../styled/login.styled";

export const Login=()=>{
    const [userdetails,setuserDetails]=useState({});
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast=useToast();

    const {authstatus}=useSelector((state)=>state); 
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location =useLocation();
    const from=location?.state?.from?.pathname || "/" 
     
    useEffect(() => { 
      if (authstatus) { 
        navigate(from, { replace: true }); 
      } 
      else{ 
        navigate("/login") 
      } 
    }, [authstatus]);
    
    const handleChange=(e)=>{

      setuserDetails({...userdetails,[e.target.name]:e.target.value});
    }

    const checkType=()=>{
        let newUserDetails={};
        let emailOrNumberId=Number(userdetails.emailOrNumericId).toString();
        if(emailOrNumberId === 'NaN'){
            newUserDetails={email:userdetails.emailOrNumericId,password:userdetails.password};
            // console.log(newUserDetails);
        }else{
            newUserDetails={numericId:userdetails.emailOrNumericId,password:userdetails.password};
            // console.log(newUserDetails);
        }
        return newUserDetails;
    }
    const handleSubmit=(e)=>{
        //  console.log(userdetails,"userdetails");
        const updatedUserDetails= checkType();
        // console.log(updatedUserDetails);
         axios.post('https://quizapp676.herokuapp.com/auth/login',updatedUserDetails)
              .then(({data})=>{
                console.log(data);
                if(data && data.status){
                    localStorage.setItem('authstatus', JSON.stringify({status:true,token:data.response._id}))
                    dispatch(setAuthStatus({status:data.status,token:data.response._id}))
                    navigate('/');
                    handleToast(data.message,'success');
                } 
                else if(data){
                    handleToast(data.message,'error');
                }
                else{
                   handleToast('Internal server error try after sometime','error');
                }
              })
              .catch(err=>console.log('err occured',err));
               
    }

    const handleToast=(message,status)=>{
      toast({
        title: message,
        status: status,
        duration: 4000,
        position:'top',
        isClosable: true,
      })
    }

    return (<>
    <Heading className={styles.alignCenter}>Login</Heading>
    <LoginCont>
    <Stack spacing={'4'}>
    <Input onChange={handleChange} type='text' name="emailOrNumericId" placeholder='Enter Email / Numberic Id' required/>

    <InputGroup size='md'>
      <Input onChange={handleChange}
        name="password"
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        required
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    <Input onClick={handleSubmit} type={'submit'}  value={'Login'} bg='#56508c' color={'white'} cursor="pointer" />
    </Stack>
    </LoginCont>
    </>)
}
