const dotenv = require('dotenv');
dotenv.config();

const mongoose=require("mongoose")
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('connection failed with database');
})


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("User", userSchema)

module.exports=User;