import "./App.css"
import { Routes, Route } from "react-router-dom"
import Dictionary from "./Dictionary"
import Navbar from "./Navbar"
import AddWord from "./AddWord"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/AddWord" element={<AddWord />}/>
      <Route path="/" element={<Dictionary />}/>
    </Routes>
    </>
  )
}

export default App
