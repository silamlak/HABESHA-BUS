import express from 'express'
import { addBus, addRoute, removeBus, updateBus } from '../controllers/operatorController.js'
const router = express.Router()

//operator on routes

router.post('/route/add', addRoute)

//operators on buses

router.post("/add/bus", addBus);

router.put("/update/bus/:busId", updateBus);

router.delete("/delete/bus/:busId", removeBus);

export default router