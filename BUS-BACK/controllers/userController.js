import cryptoRandomString from 'crypto-random-string'

import { c_e_h } from "../error_handller/custom_error_handller.js"
import routeModel from "../models/scheduleModel.js"
import seatModel from "../models/seat.js"
import bookingModel from "../models/booking.js"

export const searchRoute = async (req, res, next) => {

//    console.log(req.query)
   const { origin, destination, date, passenger } = req.query;

    try {
        // Fetch route search preferences from the database
                // Parse the date string from the request query
                const parsedDate = new Date(date);
                // console.log(parsedDate)

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

export const addSeat = async (req, res, next) => {
    try {
        console.log(req.body)
        const seatInfo = seatModel(req.body)
        await  seatInfo.save()
        res.status(201).json(seatInfo)
    } catch (error) {
        next(error)
    }
}

export const getSeats = async (req, res, next) => {
    try {
        const {routeId} = req.params
        const routeSeats = await seatModel.find({route: routeId})
        res.status(201).json(routeSeats);
    } catch (error) {
        next(error)
    }
}

export const booking = async (req, res, next) => {
  try {
    const generateRandomStrings = () => {
      const randomStrings = [];
      for (let i = 0; i < 8; i++) {
        const randomString = cryptoRandomString({
          length: 8,
          type: "alphanumeric",
        });
        randomStrings.push(randomString);
      }
      return randomStrings;
    };

    const randomBookingCodes = generateRandomStrings();

    const userBooking = new bookingModel({
      uniqueId: randomBookingCodes[0],
      passenger_info: {
        name: req.body.passenger_info.name,
        email: req.body.passenger_info.email,
      },
      routeOfId: req.body.routeOfId,
    });

    const savedBooking = await userBooking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    next(error);
  }
};

export const bookingInfo = async (req, res, next) => {
    try {
        const {bookId} = req.params
        console.log(bookId);
        const booking = await bookingModel.findById(bookId)
        if(!booking){
            return res.status(404).json('This Booking does not exist')
        }
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}

export const routeInfo = async (req, res, next) => {
    try {
        const { routeId } = req.params;
        console.log(routeId);
        const bookingRoute = await routeModel.findById(routeId);
        if (!bookingRoute) {
          return res.status(404).json({message: "This route does not exist"});
        }
        res.status(200).json(bookingRoute);
    } catch (error) {
        next(error)
    }
}

export const seatInfo = async (req, res, next) => {
  try {
    const { seatId } = req.params;
    // console.log(seatId);
    const bookingSeat = await seatModel.findOne({ bookId: seatId });
    if (!bookingSeat) {
      return res.status(404).json({message: "This seat does not exist"});
    }
    res.status(200).json(bookingSeat);
  } catch (error) {
    next(error);
  }
};

export const myBooking = async (req, res, next) => {
  try {
    const { npr } = req.query;
    console.log(npr);
    const mybooking = await bookingModel.findOne({ uniqueId: npr });
    if (!mybooking) {
      return res.status(404).json({ message: "This NPR code does not exist" });
    }
    res.status(200).json(mybooking);
  } catch (error) {
    next(error);
  }
};