import express from 'express'
import { searchRoute } from '../controllers/userController.js'

const router = express.Router()

router.get('/route/search', searchRoute)

export default router