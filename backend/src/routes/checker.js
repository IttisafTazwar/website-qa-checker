import express from 'express'
import { runCheck } from '../controllers/checkerController.js'

const router = express.Router()

router.post('/', runCheck)

export default router