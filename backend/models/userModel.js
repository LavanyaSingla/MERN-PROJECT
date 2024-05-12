const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[True, "Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[3,"Name should have more than 3 characters"]
    },
    email :{
        type:String,
        required:[True, "Please enter your email"],
        unique:True,
        validate : [validator.isEmail, "Please enter the valid email"]
    },
    password : {
        type:String,
        required:[True , "Please enter your password"],
        minLength :[8, "Please should have have 8 min length"],
        select : false
    },
    avatar :{
        public_id:{
            type : String,
            required:false
        },
        url:{
            type:String,
            required:false
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

module.exports = mongoose.model("User",userSchema);