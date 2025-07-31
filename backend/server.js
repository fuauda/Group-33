import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'MediLink API is running!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})