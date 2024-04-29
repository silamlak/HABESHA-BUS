import { c_e_h } from "../error_handller/custom_error_handller.js"
import routeModel from "../models/routeModel.js"

export const searchRoute = async (req, res, next) => {

   console.log(req.query)
   const { origin, destination, date, passenger } = req.query;

    try {
        // Fetch route search preferences from the database
                // Parse the date string from the request query
                const parsedDate = new Date(date);
                console.log(parsedDate)

                // Set the start and end of the date range to span the entire day
                const startDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
                const endDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate() + 1);
                console.log(startDate, endDate)
        
                // Fetch
        const routes = await routeModel.find({
            origin,
            destination,
            // date: `${date}T00:00:00.000Z`
            dateAdded: { $gte: startDate, $lt: endDate },
        });

        if (routes.length > 0) {
            res.json(routes);
        } else {
            res.status(404).json({ message: 'No routes found matching the search criteria' });
        }
        
    } catch (error) {
        next(error)
    }
}