const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler(401,"Please login to access this resource"));
    }
    const decodedData  = jwt.verify(token,process.env.JWT_SECRET);
    req.user =  await User.findById(decodedData.id);
    next();
    
});

exports.isAuthorizeRoles = (...roles)=>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(403,`Role: ${req.user.role} not allowed to access this user`));
        }
        next();
    }
}
