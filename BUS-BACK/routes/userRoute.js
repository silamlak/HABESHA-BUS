import express from 'express'
import { addSeat, booking, getSeats, searchRoute } from '../controllers/userController.js'

const router = express.Router()

router.get('/route/search', searchRoute)
router.get("/route/seat_route/:routeId", getSeats);
router.post('/route/seat', addSeat)
router.post('/route/booking', booking)

export default router