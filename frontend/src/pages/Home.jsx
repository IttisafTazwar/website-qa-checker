import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UrlForm from '../components/UrlForm'
import Loader from '../components/Loader'
import { checkWebsite } from '../services/api'

function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (url) => {
    setLoading(true)
    setError('')

    try {
      const data = await checkWebsite(url)
      navigate(`/results/${data.reportId}`)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Website QA Checker
          </h1>
          <p className="text-xl text-gray-500 max-w-xl">
            Instantly audit any website for broken links, accessibility issues,
            console errors, missing meta tags and more.
          </p>
        </div>

        <UrlForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {loading && <Loader />}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Broken Links</h3>
            <p className="text-gray-500 text-sm">Finds all internal and external links that return errors</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Accessibility</h3>
            <p className="text-gray-500 text-sm">Flags missing alt text, unlabelled inputs and more</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Meta Tags</h3>
            <p className="text-gray-500 text-sm">Checks title, description and og:image for SEO health</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home