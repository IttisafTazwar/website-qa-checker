
import checkWebsite from '../services/checkerService.js'
import Report from '../models/Report.js'
import crypto from 'crypto'

export const runCheck = async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({ message: 'URL is required' })
  }

  try {
    const report = await Report.create({
      url,
      status: 'pending',
      shareableLink: crypto.randomUUID(),
    })

    const results = await checkWebsite(url)

    report.results = results
    report.status = 'completed'
    await report.save()

    res.status(200).json({
      message: 'Check completed',
      reportId: report._id,
      shareableLink: report.shareableLink,
      results,
    })

  } catch (error) {
    res.status(500).json({ message: `Check failed: ${error.message}` })
  }
}