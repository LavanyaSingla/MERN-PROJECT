const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require ("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")


//Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const [name,email,password] = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"Sample public_id",
            url :"sample url"
        }
    });
    sendToken(user,201,res);
});


//Login a user 
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const [email,password] = req.body;

    if(!email || !password){
        return next(new ErrorHandler(400,"Please enter email and password"));
    }

    const user = await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new ErrorHandler(401, "Invalid username or password"));
    }

    const isPasswordMatched = user.comparePassword();

    if(!isPasswordMatched){
        return next(new ErrorHandler(401, "Invalid username or password"));
    }

    sendToken(user,200,res);
});

//Logout a user

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

//Reset Password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler(404,"User not found"));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is \n\n ${resetPasswordUrl} \n\n If you have not requested this email, then please ignore it`;
    try{

        await sendEmail({
            email:user.email,
            subject :"Ecommerce password recovery",
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(500,error.message));
    }
})