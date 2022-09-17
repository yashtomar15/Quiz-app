import axios from "axios";
import React,{useEffect,useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export const Home=()=>{
    const[qstions,setqstions]=useState([]);
    const convertData=(data)=>{
        console.log(data,'from convert');
        let questions=[];
        
        data.results.forEach((item,ind)=>{
            let randomNumber=Math.floor(Math.random() * 4) + 1;
            console.log(randomNumber);
            let question={};
               if(randomNumber===1){
                question['Question_Id']=uuidv4();
                question['Question_Text']=item.question;
                question['Option_A']=item.correct_answer;
                question['Option_B']=item.incorrect_answers[0];
                question['Option_C']=item.incorrect_answers[1];
                question['Option_D']=item.incorrect_answers[2];
                question['Correct_Option']=item.correct_answer;
               }
               else if(randomNumber===2){
                question['Question_Id']=uuidv4();
                question['Question_Text']=item.question;
                question['Option_A']=item.incorrect_answers[0];
                question['Option_B']=item.correct_answer;
                question['Option_C']=item.incorrect_answers[1];
                question['Option_D']=item.incorrect_answers[2];
                question['Correct_Option']=item.correct_answer;
               }
               else if(randomNumber===3){
                question['Question_Id']=uuidv4();
                question['Question_Text']=item.question;
                question['Option_A']=item.incorrect_answers[0];
                question['Option_B']=item.incorrect_answers[1];
                question['Option_C']=item.correct_answer;
                question['Option_D']=item.incorrect_answers[2];
                question['Correct_Option']=item.correct_answer;
               }
               else if(randomNumber===4){
                question['Question_Id']=uuidv4();
                question['Question_Text']=item.question;
                question['Option_A']=item.incorrect_answers[0];
                question['Option_B']=item.incorrect_answers[1];
                question['Option_C']=item.incorrect_answers[2];
                question['Option_D']=item.correct_answer;
                question['Correct_Option']=item.correct_answer;
               }
            
               questions.push(question);
        })
    
        console.log(questions);
     setqstions([...questions]);
    }

    useEffect(()=>{
    axios.get('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
    .then((res)=>{
        console.log(res.data);
        convertData(res.data);
    })
    .catch(err=>console.log(err));
    },[])

    return (<>
    {qstions && qstions.map((item)=>{
        return <span style={{fontSize:'5px'}}>{JSON.stringify(item)+', '}</span>
    })}
    </>)
}
