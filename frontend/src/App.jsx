import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Results from './pages/Results'
import Report from './pages/Report'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/report/:link" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App