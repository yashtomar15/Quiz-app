const mongoose=require('mongoose');

const quizSchema=mongoose.Schema({
    Question_Id:String,
    Question_Text:String,
    Option_A:String,
    Option_B:String,
    Option_C:String,
    Option_D:String,
    Correct_Option:String
})

const Quiz=mongoose.model('quiz',quizSchema);

module.exports=Quiz;

