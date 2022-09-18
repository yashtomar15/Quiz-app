import { Flex ,useToast} from "@chakra-ui/react";
import React ,{useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { setCorrectAnsCount, setTotalQuestions } from "../store/actions";
import { ResultCont,Label,Pera,Heading ,Button} from "../styled/result.styled";
import { setAuthStatus } from "../store/actions";
import { useNavigate } from "react-router-dom";

export const Result=()=>{
    const [incorrectAnswers,setIncorrectAnsers]=useState(0);
    const [percentage,setPercentage]=useState(0);
    const {correctCount}=useSelector((state)=>state);
    const {totalQuestions}=useSelector((state)=>state);
    const toast=useToast();

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const localCorrectCount=JSON.parse(localStorage.getItem('correctCount'));
    const localTotalQuestions=JSON.parse(localStorage.getItem('totalquestions'));
    
    useEffect(()=>{
        // console.log(localCorrectCount,'local count')
        // console.log(localTotalQuestions,'total')
     dispatch(setCorrectAnsCount(localCorrectCount));
     dispatch(setTotalQuestions(localTotalQuestions));
     setIncorrectAnsers(localTotalQuestions-localCorrectCount);
     let score=(localCorrectCount*100)/localTotalQuestions;
        score=score.toString().slice(0,2);
        console.log(score,'score');
        setPercentage(score);
    },[])
   
    const handleLogout=()=>{
        localStorage.setItem('authstatus',JSON.stringify({status:false,token:0}));
        localStorage.setItem('correctCount',JSON.stringify(0));
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
    <Heading>Result</Heading>
    <ResultCont>
        <Flex><Label>Total Questions</Label><Pera>{totalQuestions}</Pera></Flex>
        <Flex><Label>Incorrect Answers</Label><Pera>{incorrectAnswers}</Pera></Flex>
        <Flex><Label>Correct Answers</Label><Pera>{correctCount}</Pera></Flex>
        <Flex><Label>Score</Label><Pera>{percentage}%</Pera></Flex>
    </ResultCont>
    <Button onClick={handleLogout}>Logout</Button>
    </>)
}