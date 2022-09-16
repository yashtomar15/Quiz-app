
const initstate={
    authstatus:false,
    token:0,
    questions:[]
}

export const reducer=(state=initstate,{type,payload})=>{
    switch(type){
        case "SET_AUTH_STATUS":{
            return {...state,authstatus:payload.status,token:payload.token}
        }
        case "ADD_QUIZ_QUESTIONS":{
            return {...state,questions:payload}
        }
        default:{
            return state;
        }
    }
}