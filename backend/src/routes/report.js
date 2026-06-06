import express from 'express'
import {
  getReportById,
  getReportByShareableLink,
  getAllReports,
} from '../controllers/reportController.js'

const router = express.Router()

router.get('/', getAllReports)
router.get('/:id', getReportById)
router.get('/share/:link', getReportByShareableLink)

export default router