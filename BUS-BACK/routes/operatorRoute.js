import express from 'express'
import { addRoute } from '../controllers/operatorController.js'
const router = express.Router()

router.post('/route/add', addRoute)

export default router