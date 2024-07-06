import { createError } from "./error.js";
import jwt  from "jsonwebtoken";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"You are not authenticate"))
    }

    jwt.verify(token, process.env.JWT,(err,user)=>{ // user ->  parameter returns the infromation like which is set for token 
        if(err){
            return next(createError(403,"Token is not valid"));
        }
        req.user = user
        next()
    })   
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id === req.params.id || req.body.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}