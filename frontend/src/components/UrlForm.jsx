import { useState } from 'react'

function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!url) {
      setError('Please enter a URL')
      return
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('URL must start with http:// or https://')
      return
    }

    onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-3">
        <label className="text-gray-700 font-medium">
          Enter a website URL to check
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </form>
  )
}

export default UrlForm