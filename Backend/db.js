const mongoose=require('mongoose');

const connection=mongoose.connect('mongodb+srv://yashtomar15:incorrect_quiz-app@cluster0.uhg5iyn.mongodb.net/QuizApp?retryWrites=true&w=majority');

module.exports=connection;