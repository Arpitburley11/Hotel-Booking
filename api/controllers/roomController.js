import { Hotel } from "../models/hotelModel.js";
import {Room} from '../models/roomModel.js'


export const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = req.body;

    try{
        const savedRoom = await Room.create(newRoom)
        try{
            const hotelRoom = await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms: savedRoom._id}})
        }
        catch(err){
            next(err)
        }
        res.status(200).send(savedRoom)
    }
    catch(err){
        next(err)
    }
}

export const updateRoom = async(req,res,next)=>{
    try{
        const {id} = req.params
        const updateRoom = await Room.findByIdAndUpdate(id,req.body)
        if(!updateRoom){
            return res.status(404).send("Hotel Not Found")
        }
        else{
            return res.status(200).send(updateRoom)
        }
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}

export const updateRoomAvailability = async(req,res,next)=>{
    try{
        await Room.updateOne(
            {"roomNumbers._id": req.params.id},
            {$push :{"roomNumbers.$.unavailableDates": req.body.dates}}
        )
        res.status(200).send("Room status has been updated.")
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}


export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid
    try{
        const deleteRoom = await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms: req.params.id}})
        }
        catch(err){
            next(err)
        }
        res.status(200).send("Room deleted successfully! ")
    }
    catch(err){    
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}

export const  getRoom = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const room = await Room.findById(id)
        res.status(200).json(room)
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}

export const getRooms = async(req,res,next)=>{
    try{
        const rooms = await Room.find();
        res.status(200).send(rooms)
    }
    catch(err){
        next(err);
    }
}