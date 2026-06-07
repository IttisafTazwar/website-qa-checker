import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export const checkWebsite = async (url) => {
  const response = await axios.post(`${BASE_URL}/api/check`, { url })
  return response.data
}

export const getReportById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/reports/${id}`)
  return response.data
}

export const getReportByShareableLink = async (link) => {
  const response = await axios.get(`${BASE_URL}/api/reports/share/${link}`)
  return response.data
}