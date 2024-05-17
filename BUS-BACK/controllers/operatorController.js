import mongoose from "mongoose"
import { c_e_h } from "../error_handller/custom_error_handller.js"
import busModel from "../models/bus.js"
import routeModel from "../models/routeModel.js"
import { body, validationResult } from "express-validator"

//operator on routes

export const addRoute = async (req, res, next) => {

    const {origin, destination, cost, distance, duration, busId, dateAdded} = req.body

    if (!origin || !destination || !cost || !distance || !duration || !busId || !dateAdded) {
        return next(c_e_h(400, 'all field needed'))
    }

    try {

        const route = new routeModel({
            origin,
            destination,
            cost,
            distance,
            duration,
            busId,
            dateAdded
        })

        await route.save()

        res.status(201).json({message: 'route created'});
        
    } catch (error) {
        next(error)
    }
}

//operator on buses

export const addBus = async (req, res, next) => {
    try {
        const validations = [
          body("busNumber").notEmpty().withMessage("bus number is required"),
          body("capacity").notEmpty().withMessage("capacity is required"),
          body("model").notEmpty().withMessage("model is required"),
        ];
        await Promise.all(validations.map((validation) => validation.run(req)))
        const errors = validationResult(req)
        if(!errors.isEmpty()){
             return res.status(400).json({ errors: errors.array() });
        }
        const newBus = new busModel(req.body)
        await newBus.save()
        res.status(201).json({message: 'new bus added'})
    } catch (err) {
        next(err)
    }
}

export const updateBus = async (req, res, next) => {
    try {
        const {busId} = req.params
        const bus = await busModel.findById(busId)
        if(!bus) return res.status(404).json({message: 'no bus found'})
            const updated_bus = await busModel.findByIdAndUpdate(
        busId,
        {$set: req.body},
        {new: true}
    )
    res.status(200).json(updated_bus)
    } catch (err) {
        next(err)
    }
}

export const removeBus = async (req, res, next) => {
 const session = await mongoose.startSession();
 session.startTransaction();

 try {
   const { busId } = req.params;

   const operator = await busModel.findById(busId).session(session);
   if (!operator) {
     await session.abortTransaction();
     session.endSession();
     return res.status(404).json({ message: "bus not found" });
   }

   await mongoose.connection
     .collection("deleted_bus")
     .insertOne(operator, { session });

   await busModel.findByIdAndDelete(busId).session(session);

   await session.commitTransaction();
   session.endSession();

   res
     .status(200)
     .json({ message: "bus deleted and archived successfully" });
 } catch (err) {
   next(err);
 }
}