const mongoose=require('mongoose');

const authSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    email:{type:String,required:true,unique:true},
    numericId:{type:Number,unique:true,required:true},
    password:{type:String,required:true},
})

const Auth=mongoose.model('auth',authSchema);

module.exports={Auth};