const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./database/database')
const authRoutes = require('../server/routes/auth')
const categoryRoutes = require('../server/routes/category')
const jobRoutes = require('../server/routes/job')

const app = express()

// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/job', jobRoutes)
app.use('/server/images', express.static('server/images'))

// Setting config file
dotenv.config({ path: 'server/config/config.env' })

// Connection database
connectDB()

// Starting server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
