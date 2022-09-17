import { Flex } from "@chakra-ui/react";
import React ,{useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { setCorrectAnsCount, setTotalQuestions } from "../store/actions";
import { ResultCont,Label,Pera,Heading } from "../styled/result.styled";

export const Result=()=>{
    const [incorrectAnswers,setIncorrectAnsers]=useState(0);
    const [percentage,setPercentage]=useState(0);
    const {correctCount}=useSelector((state)=>state);
    const {totalQuestions}=useSelector((state)=>state);
    const dispatch=useDispatch();
    const localCorrectCount=JSON.parse(localStorage.getItem('correctCount'));
    const localTotalQuestions=JSON.parse(localStorage.getItem('totalquestions'));
    
    useEffect(()=>{
        console.log(localCorrectCount,'local count')
        console.log(localTotalQuestions,'total')
     dispatch(setCorrectAnsCount(localCorrectCount));
     dispatch(setTotalQuestions(localTotalQuestions));
     setIncorrectAnsers(localTotalQuestions-localCorrectCount);
     let score=(localCorrectCount*100)/localTotalQuestions;
        score=score.toString().slice(0,2);
        console.log(score,'score');
        setPercentage(score);
    },[])
   
    
    return (<>
    <Heading>Result</Heading>
    <ResultCont>
        <Flex><Label>Total Questions</Label><Pera>{totalQuestions}</Pera></Flex>
        <Flex><Label>Incorrect Answers</Label><Pera>{incorrectAnswers}</Pera></Flex>
        <Flex><Label>Correct Answers</Label><Pera>{correctCount}</Pera></Flex>
        <Flex><Label>Score</Label><Pera>{percentage}%</Pera></Flex>
    </ResultCont>
    </>)
}