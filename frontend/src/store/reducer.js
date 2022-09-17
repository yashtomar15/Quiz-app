
const initstate={
    authstatus:false,
    token:0,
    questions:[],
    correctCount:0,
    totalQuestions:0
}

export const reducer=(state=initstate,{type,payload})=>{
    switch(type){
        case "SET_AUTH_STATUS":{
            return {...state,authstatus:payload.status,token:payload.token}
        }
        case "ADD_QUIZ_QUESTIONS":{
            return {...state,questions:payload}
        }
        case "SET_CORRECT_ANS_COUNT":{
            return {...state,correctCount:payload}
        }
        case "SET_TOTAL_QUESTIONS":{
            return {...state,totalQuestions:payload}
        }
        default:{
            return state;
        }
    }
}