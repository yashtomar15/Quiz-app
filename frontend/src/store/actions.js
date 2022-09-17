import { SET_AUTH_STATUS,ADD_QUIZ_QUESTIONS,SET_CORRECT_ANS_COUNT,SET_TOTAL_QUESTIONS } from "./actionCreator";

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

export const setCorrectAnsCount=(payload)=>{
    return {
        type:SET_CORRECT_ANS_COUNT,
        payload
    }
}

export const setTotalQuestions=(payload)=>{
    return {
        type:SET_TOTAL_QUESTIONS,
        payload
    }
}