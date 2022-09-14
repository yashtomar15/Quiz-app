const Router=require('express');
const {Auth}=require('../../Models/auth');

const authRouter=Router();

authRouter.post('/signup',async (req,res)=>{
    console.log(req.body);
    if(req.body.email && req.body.numericId && req.body.firstName && req.body.password){
        let signupData=await new Auth(req.body);
        signupData.save((err)=>{
            if ( err && err.code !== 11000 ) {
                console.log(err,'err');
                console.log(err.code, ' error code');
                res.send({message:"Something went wrong",status:false});
                return;
              }
            
              //duplicate key
              if ( err && err.code === 11000 ) {
                res.send({message:"User already exists",status:false});
                return;
              }
              res.send({response:signupData,message:'signup succesfully',status:true});
        });
    }else{
         return res.send({message:"please fill all details",status:false});
    }
})

authRouter.post('/login',async (req,res)=>{
    if((req.body.numericId && req.body.password) || (req.body.email && req.body.password)){
        let userDetails=await Auth.find(req.body);
        if(userDetails.length>0){
          return res.send({response:userDetails[0],message:"Logged in succesfully",status:true});
        }
    }else{
        return res.send({message:"Something missing",status:false});
    }
    // Email validation
    if(req.body.email && req.body.password){
        // Password validation 
        userDetails=await Auth.find({email:req.body.email});
        if(userDetails.length>0){
           return res.send({message:"Invaild password",status:false});
        }

       //  Email validation
       userDetails=await Auth.find({password:req.body.password});
       if(userDetails.length>0){
          return res.send({message:"Invaild email",status:false});
       }
       return res.send({message:"Invaild Email and password",status:false});
        }

         // Numeric Id validation
    if(req.body.numericId && req.body.password){
        // Password validation 
        userDetails=await Auth.find({email:req.body.numericId});
        if(userDetails.length>0){
           return res.send({message:"Invaild password",status:false});
        }

       //  Numeric Id check 
       userDetails=await Auth.find({password:req.body.password});
       if(userDetails.length>0){
          return res.send({message:"Invaild Numeric ID",status:false});
       }

       return res.send({message:"Invaild NumericId and password",status:false});
        }

        return res.send({message:"something went wrong",status:false});
})

authRouter.get('/allusers',async (req,res)=>{
    const usersData= await Auth.find();
    return res.send(usersData);
})
