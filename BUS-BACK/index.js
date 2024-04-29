import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import busOperator from './routes/operatorRoute.js'
import userRoute from './routes/userRoute.js'

const app = express()

dotenv.config()
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api/operator', busOperator)
app.use('/api/user', userRoute)

app.use((err, req, res, next) => {
    const status = err.status || '500'
    const message = err.message || 'server error'
    return res.status(status).json({
        message,
        status,
        success: false
    })
})

app.listen(3000, () => {
    console.log('good server')
    mongoose.connect(process.env.MONGODB)
    .then(() => console.log('good db'))
    .catch((err) => console.log(err))
})