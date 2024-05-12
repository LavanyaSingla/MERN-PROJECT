const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');

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
    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token
    });
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

    const token = user.getJWTToken();

    res.status(200).json({
        success:true,
        token
    });

});