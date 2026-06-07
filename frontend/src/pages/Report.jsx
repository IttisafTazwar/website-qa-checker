import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { getReportByShareableLink } from '../services/api'

function Report() {
  const { link } = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportByShareableLink(link)
        setReport(data)
      } catch (err) {
        setError('Report not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [link])

  if (loading) return <Loader />
  if (error) return (
    <div className="text-center py-20 text-red-500">{error}</div>
  )

  const { results, url, createdAt } = report

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full w-fit">
            Shared Report
          </span>
          <h1 className="text-3xl font-bold text-gray-900">QA Report</h1>
          <p className="text-gray-500 text-sm">
            Checked: <span className="font-medium text-gray-700">{url}</span>
          </p>
          <p className="text-gray-400 text-xs">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Check Your Own Website
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-red-500">{results.brokenLinks.length}</p>
            <p className="text-gray-500 text-sm mt-1">Broken Links</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-yellow-500">{results.accessibilityIssues.length}</p>
            <p className="text-gray-500 text-sm mt-1">Accessibility Issues</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-indigo-500">{(results.performance.loadTime / 1000).toFixed(2)}s</p>
            <p className="text-gray-500 text-sm mt-1">Load Time</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ResultCard
            title="Broken Links"
            status={results.brokenLinks.length === 0 ? 'pass' : 'fail'}
            items={results.brokenLinks.map(l => `${l.link} — Status ${l.statusCode}`)}
            emptyMessage="No broken links found"
          />
          <ResultCard
            title="Console Errors"
            status={results.consoleErrors.length === 0 ? 'pass' : 'fail'}
            items={results.consoleErrors}
            emptyMessage="No console errors found"
          />
          <ResultCard
            title="Accessibility Issues"
            status={results.accessibilityIssues.length === 0 ? 'pass' : 'warn'}
            items={results.accessibilityIssues.map(i => i.description)}
            emptyMessage="No accessibility issues found"
          />
          <ResultCard
            title="Meta Tags"
            status={results.metaTags.title ? 'pass' : 'warn'}
            items={[
              `Title: ${results.metaTags.title || 'Missing'}`,
              `Description: ${results.metaTags.description || 'Missing'}`,
              `OG Image: ${results.metaTags.ogImage || 'Missing'}`,
            ]}
            emptyMessage="No meta tag data"
          />
        </div>

      </div>
    </main>
  )
}

export default Report