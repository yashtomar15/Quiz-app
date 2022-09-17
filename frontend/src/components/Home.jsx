import React,{useEffect,useState} from "react";
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux';
import {addQuestions, setCorrectAnsCount, setTotalQuestions} from '../store/actions';
import {Button, Flex} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import styles from '../stylemodules/generalStyle.module.css';
import {ImCross} from 'react-icons/im';
import {BsCheckLg} from 'react-icons/bs';
import { QuestionText,QuestionsCont,QuestionNum,IconDiv,Pera,Heading } from "../styled/home.styled";

export const Home=()=>{
const[questionNum,setQuestionNum]=useState(0);
const [isSubmit,setisSubmit]=useState(false);
const[isShowA,setIsShowA]=useState(false);
const[isShowB,setIsShowB]=useState(false);
const[isShowC,setIsShowC]=useState(false);
const[isShowD,setIsShowD]=useState(false);

const {questions}=useSelector((state)=>state);
const {correctCount}=useSelector((state)=>state);
console.log(questions,'querstions from redux');
console.log(correctCount,'correctCount from redux');
const dispatch=useDispatch();
const navigate=useNavigate();
const localCorrectCount=JSON.parse(localStorage.getItem('correctCount')) || 0;

useEffect(()=>{
axios.get('https://quizapp676.herokuapp.com/quiz/allquestions')
.then((res)=>{
    console.log(res.data.data,'data from database');
    dispatch(addQuestions(res.data.data));
    dispatch(setTotalQuestions(res.data.data.length));
    localStorage.setItem('totalquestions',JSON.stringify(res.data.data.length))
})
.catch(err=>console.log('error occured',err));

dispatch(setCorrectAnsCount(localCorrectCount));

},[])

const handleNext=()=>{
    setIsShowA(false);
    setIsShowB(false);
    setIsShowC(false); 
    setIsShowD(false);
   if(questionNum===questions.length-2){
    setisSubmit(true);
   }
    setQuestionNum(questionNum+1);
}

const handleSubmit=()=>{
    navigate('/result');
}

const handleClick=(optionNum,questions,isCorrect)=>{
    console.log(questions[questionNum].Correct_Option);
    if(questionNum===0 && isCorrect){
        dispatch(setCorrectAnsCount(1));
        localStorage.setItem('correctCount',JSON.stringify(1));
    } 
    else if(isCorrect){
        dispatch(setCorrectAnsCount(correctCount+1));
        localStorage.setItem('correctCount',JSON.stringify(correctCount+1));
    }

switch(optionNum){
    case 'A':{
        console.log(questions[questionNum].Option_A);
        setIsShowA(true);
        return
    }
    case 'B':{
        console.log(questions[questionNum].Option_B);
        setIsShowB(true);
        return
    }
    case 'C':{
        console.log(questions[questionNum].Option_C);
        setIsShowC(true);
        return 
    }
    case 'D':{
        console.log(questions[questionNum].Option_D);
        setIsShowD(true);
        return 
    }
    default:{
        console.log(questions);
        return
    }
}
}
    return (<>
    <Heading className={styles.alignCenter}>Quiz</Heading>
    {questions[0] ?
     (<QuestionsCont>
        <Flex mb={'3'}>
            <QuestionNum>{questionNum+1}/{questions.length}</QuestionNum>
            <QuestionText>{questions[questionNum].Question_Text}</QuestionText>
        </Flex>
        <div>
            {questions[questionNum].Option_A===questions[questionNum].Correct_Option ? (
              !isShowA?  (<Pera onClick={()=>handleClick('A',questions,true)}><span className={styles.spanMargin}>A.</span> {questions[questionNum].Option_A}</Pera>)  : 
                (<Pera style={{backgroundColor:'#4da16a'}}><IconDiv className={styles.spanMargin}><BsCheckLg /></IconDiv> <span>{questions[questionNum].Option_A}</span></Pera>)  
            ) : (
                !isShowA?  (<Pera onClick={()=>handleClick('A',questions,false)}><span className={styles.spanMargin}>A.</span> {questions[questionNum].Option_A}</Pera>) : 
                (<Pera style={{backgroundColor:'#e53e3e'}}><IconDiv className={styles.spanMargin}><ImCross /></IconDiv> <span>{questions[questionNum].Option_A}</span></Pera>)  
              )
            }

            {questions[questionNum].Option_B===questions[questionNum].Correct_Option ? (
              !isShowB?  (<Pera onClick={()=>handleClick('B',questions,true)}><span className={styles.spanMargin}>B.</span> {questions[questionNum].Option_B}</Pera>)  : 
                (<Pera style={{backgroundColor:'#4da16a'}}><IconDiv className={styles.spanMargin}><BsCheckLg /></IconDiv> <span>{questions[questionNum].Option_B}</span></Pera>)  
            ) : (
                !isShowB?  (<Pera onClick={()=>handleClick('B',questions,false)}><span className={styles.spanMargin}>B.</span> {questions[questionNum].Option_B}</Pera>) : 
                (<Pera style={{backgroundColor:'#e53e3e'}}><IconDiv className={styles.spanMargin}><ImCross /></IconDiv> <span>{questions[questionNum].Option_B}</span></Pera>)  
              )
            }

            {questions[questionNum].Option_C===questions[questionNum].Correct_Option ? (
              !isShowC?  (<Pera onClick={()=>handleClick('C',questions,true)}><span className={styles.spanMargin}>C.</span> {questions[questionNum].Option_C}</Pera>)  : 
                (<Pera style={{backgroundColor:'#4da16a'}}><IconDiv className={styles.spanMargin}><BsCheckLg /></IconDiv> <span>{questions[questionNum].Option_C}</span></Pera>)  
            ) : (
                !isShowC?  (<Pera onClick={()=>handleClick('C',questions,false)}><span className={styles.spanMargin}>C.</span> {questions[questionNum].Option_C}</Pera>) : 
                (<Pera style={{backgroundColor:'#e53e3e'}}><IconDiv className={styles.spanMargin}><ImCross /></IconDiv> <span>{questions[questionNum].Option_C}</span></Pera>)  
              )
            }

           {questions[questionNum].Option_D===questions[questionNum].Correct_Option ? (
              !isShowD?  (<Pera onClick={()=>handleClick('D',questions,true)}><span className={styles.spanMargin}>D.</span> {questions[questionNum].Option_D}</Pera>)  : 
                (<Pera style={{backgroundColor:'#4da16a'}}><IconDiv className={styles.spanMargin}><BsCheckLg /></IconDiv> <span>{questions[questionNum].Option_D}</span></Pera>)  
            ) : (
                !isShowD?  (<Pera onClick={()=>handleClick('D',questions,false)}><span className={styles.spanMargin}>D.</span> {questions[questionNum].Option_D}</Pera>) : 
                (<Pera style={{backgroundColor:'#e53e3e'}}><IconDiv className={styles.spanMargin}><ImCross /></IconDiv> <span>{questions[questionNum].Option_D}</span></Pera>)  
              )
            }
           
        </div>
       {!isSubmit ? (<Button onClick={handleNext} color='white' bgColor='#56508c' ml={'80%'} mt="2" h={'9'}>next</Button>) :
        (<Button onClick={handleSubmit} color='white' bgColor='#56508c' ml={'80%'} mt="2" h={'9'}>Submit</Button>)} 
        </QuestionsCont>) : (<h1>loading.... ...</h1>)
    }
    </>)
}
