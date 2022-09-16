import { SET_AUTH_STATUS,ADD_QUIZ_QUESTIONS } from "./actionCreator";

export const setAuthStatus=(payload)=>{
  return   {
        type:SET_AUTH_STATUS,
        payload
    }
}

export const addQuestions=(payload)=>{
    return {
        type:ADD_QUIZ_QUESTIONS,
        payload
    }
}
