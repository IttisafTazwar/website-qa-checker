import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        QA Checker
      </Link>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">
          Home
        </Link>
      </div>
    </nav>
  )
}

export default Navbar