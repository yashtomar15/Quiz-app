import React ,{useState} from "react";
import { Input ,Flex, Stack,InputGroup, InputRightElement,Button} from '@chakra-ui/react'
import styled from 'styled-components';
import styles from '../stylemodules/generalStyle.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 

const SignupCont=styled.div`
width:40%;
margin:auto;
display:grid;
grid-gap:15px;
margin-top:60px;
border:1px solid #56508c;
border-radius:5px;
padding:20px;
`

const Heading=styled.h1`
text-align:center;
font-size:30px;
font-weight:700;
margin-top:40px;
`
export const Signup=()=>{
    const [userdetails,setuserDetails]=useState({});
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    const handleChange=(e)=>{
      setuserDetails({...userdetails,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
         console.log(userdetails,"userdetails");
         axios.post('https://quizapp676.herokuapp.com/auth/signup',JSON.stringify(userdetails) )
              .then((data)=>{
                console.log(data)
              })
              .catch(err=>console.log('err occured',err));
               
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
    <Input onClick={handleSubmit} type={'submit'}  value={'Submit'} bg='#56508c' color={'white'} cursor="pointer" />
    </Stack>
    </SignupCont>
    </>)
}
