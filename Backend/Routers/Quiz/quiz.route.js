const Router=require('express');
const Quiz=require('../../Backend/Models/quiz');

const quizRouter=Router();

// get method for gettting quizes
quizRouter.get('/allquestions',async (req,res)=>{
    const quizData= await Quiz.find();
    res.send({data:quizData});
})

// post method for adding question
quizRouter.post('/addquestion',async (req,res)=>{
    let addData=  new Quiz(req.body);
    addData.save();
    res.send('post succesfully');
})


module.exports=quizRouter;