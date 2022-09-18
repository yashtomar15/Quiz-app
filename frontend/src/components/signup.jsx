import React ,{useState} from "react";
import { Input ,Flex, Stack,InputGroup, InputRightElement,Button, useToast} from '@chakra-ui/react'
import styles from '../stylemodules/generalStyle.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { useDispatch } from "react-redux";
import {setAuthStatus} from '../store/actions';
import {SignupCont,Heading} from '../styled/signup.styled';

export const Signup=()=>{
    const [userdetails,setuserDetails]=useState({});
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast=useToast();

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleChange=(e)=>{
      setuserDetails({...userdetails,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        //  console.log(userdetails,"userdetails");
         axios.post('https://quizapp676.herokuapp.com/auth/signup',userdetails)
              .then(({data})=>{
                // console.log(data);
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
                  handleToast('Internal server error try after sometime','success');
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
    <Heading className={styles.alignCenter}>Signup</Heading>
    <SignupCont>
    <Flex >
        <Input onChange={handleChange} name="firstName" placeholder="First name" required/>
        <Input onChange={handleChange} name="lastName" placeholder="Last name" />
    </Flex>
    <Stack spacing={'4'}>
        <Input onChange={handleChange} type={'email'} name="email" placeholder="Enter email" required/>
    <Input onChange={handleChange} type='number' name="numericId" placeholder='Phone number / Numberic Id' required/>

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
    <Input onClick={handleSubmit} type={'submit'}  value={'Signup'} bg='#56508c' color={'white'} cursor="pointer" />
    </Stack>
    </SignupCont>
    </>)
}
