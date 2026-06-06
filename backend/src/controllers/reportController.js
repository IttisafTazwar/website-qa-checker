import Report from '../models/Report.js'

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json({ message: `Error fetching report: ${error.message}` })
  }
}

export const getReportByShareableLink = async (req, res) => {
  try {
    const report = await Report.findOne({ shareableLink: req.params.link })
    if (!report) {
      return res.status(404).json({ message: 'Report not found' })
    }
    res.status(200).json(report)
  } catch (error) {
    res.status(500).json({ message: `Error fetching report: ${error.message}` })
  }
}

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 })
    res.status(200).json(reports)
  } catch (error) {
    res.status(500).json({ message: `Error fetching reports: ${error.message}` })
  }
}