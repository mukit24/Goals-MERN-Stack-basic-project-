const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use(express.json())
app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server is running on port ${port}`))