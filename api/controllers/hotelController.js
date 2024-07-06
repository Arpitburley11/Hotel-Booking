import {Hotel} from '../models/hotelModel.js'
import {Room} from '../models/roomModel.js'

export const createHotel = async(req,res,next)=>{
    const newHotel = req.body
    try{
        const savedHotel = await Hotel.create(newHotel);
        res.status(200).send(savedHotel);
    }
    catch(err){
        // res.status(500).send(err);
        next(err) // Above line can be use instead of this 
    }
}

export const updateHotel = async(req,res,next)=>{
    try{
        const {id} = req.params
        const updateHotel = await Hotel.findByIdAndUpdate(id,req.body)
        if(!updateHotel){
            return res.status(404).send("Hotel Not Found")
        }
        else{
            return res.status(200).send(updateHotel)
        }
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}

export const deleteHotel = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const deleteHotel = await Hotel.findByIdAndDelete(id)
        if(!deleteHotel){
            res.send(404).send("Hotel Not Found.")
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

export const  getHotel = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const hotel = await Hotel.findById(id)
        res.status(200).json(hotel)
    }
    catch(err){
        // res.status(500).send(err)
        next(err) // Above line can be use instead of this 
    }
}

export const getHotels = async(req,res,next)=>{
    const limit1 = parseInt(req.query.limit)
    const {min, max, limit, ...others} = req.query 
    try{
        const hotels = await Hotel.find({...others,cheapestPrice: {$gt: min |1, $lt : max|| 999}}).limit(limit1) // Intresting part 
        res.status(200).send(hotels)
    }
    catch(err){
        next(err);
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map((city)=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).send(list)
    }
    catch(err){
        next(err);
    }
}
export const countByType = async(req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"Hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"Apartment"})
        const resortCount = await Hotel.countDocuments({type:"Resort"})
        const villaCount = await Hotel.countDocuments({type:"Villa"})
        const hostelCount = await Hotel.countDocuments({type:"Hostel"})
        
        res.status(200).send([
            {type:"hotel", count: hotelCount},
            {type:"apartment", count: apartmentCount},
            {type:"resort", count: resortCount},
            {type:"villa", count: villaCount},
            {type:"hostel", count: hostelCount}
        ])
    }
    catch(err){
        next(err);
    }
}

export const getHotelRooms = async(req,res,next)=>{
    try{  
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room)
        })) 
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
}   