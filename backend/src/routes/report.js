import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'Report route is working' })
})

export default router