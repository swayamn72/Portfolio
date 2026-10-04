import { Routes, Route } from 'react-router-dom'
import './App.css'
import EasterEgg from './EasterEgg'
import Navbar from './components/Navbar'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/easter-egg" element={<EasterEgg />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </>
  )
}

export default App
