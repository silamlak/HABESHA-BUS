import { c_e_h } from "../error_handller/custom_error_handller.js"
import routeModel from "../models/routeModel.js"

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