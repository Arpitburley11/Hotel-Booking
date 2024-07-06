import { User } from '../models/userMode.js'

// User functions 
export const updateUser = async(req,res,next)=>{
    try{
        const {id} = req.params
        const updateUser = await User.findByIdAndUpdate(id,req.body)
        if(!updateUser){
            return res.status(404).send("User Not Found")
        }
        else{
            return res.status(200).send(updateUser)
        }
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}
export const deleteUser = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser){
            res.send(404).send("User Not Found.")
        }
        else{
            res.status(200).send("Deleted Successfully.")
        }
    }
    catch(err){    
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}
export const  getUser = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}

export const getUsers = async(req,res,next)=>{
    try{
        const users = await Hotel.find();
        res.status(200).send(users)
    }
    catch(err){
        next(err);
    }
}