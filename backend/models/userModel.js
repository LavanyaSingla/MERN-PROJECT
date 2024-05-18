const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


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

//Encrypting the password before storing
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
;})


//JWT Token, to login the user after registering
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}
userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword,this.password);
}
//Generating password Reset Token 
userSchema.methods.getResetPasswordToken = function(){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+15*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User",userSchema);