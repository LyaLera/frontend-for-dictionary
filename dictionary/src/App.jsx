import "./App.css"
import { Routes, Route } from "react-router-dom"
import Dictionary from "./Dictionary"
import Navbar from "./Navbar"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dictionary />}/>
    </Routes>
    </>
  )
}

export default App
