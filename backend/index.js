import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/db.js'
import checkerRouter from './src/routes/checker.js'
import reportRouter from './src/routes/report.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/check', checkerRouter)
app.use('/api/reports', reportRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Website QA Checker API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})