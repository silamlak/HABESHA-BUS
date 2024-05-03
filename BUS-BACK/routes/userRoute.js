import express from 'express'
import { addSeat, booking, bookingInfo, getSeats, myBooking, routeInfo, searchRoute, seatInfo } from '../controllers/userController.js'

const router = express.Router()

router.get('/route/search', searchRoute)
router.get("/booking/mybooking", myBooking);
router.get("/route/seat_route/:routeId", getSeats);
router.get("/route/booking/info/:bookId", bookingInfo);
router.get("/route/booking/route/:routeId", routeInfo);
router.get("/route/booking/seat/:seatId", seatInfo);
router.post('/route/seat', addSeat)
router.post('/route/booking', booking)

export default router