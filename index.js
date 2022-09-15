const { urlencoded } = require('express');
const express=require('express');
const authRouter=require('./Routers/Auth/auth.route');
const quizRouter=require('./Routers/Quiz/quiz.route');
const connection=require('./db');

const app=express();

app.use(urlencoded({extended:true}));
app.use(express.json());

// auth middleware
app.use('/auth',authRouter);

// quiz middleware
app.use('/quiz',quizRouter);

app.get('/',(req,res)=>{
    res.send("welcome to quiz app");
})

const port=process.env.PORT || 8080;

app.listen(port, async ()=>{
    await connection;
    try{
        console.log('server started at port 8080 and database connected');
    }
    catch{
        console.log('something went wrong, server and database not connected');
    }
})
