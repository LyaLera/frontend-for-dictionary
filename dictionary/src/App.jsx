import "./App.css"
import { Routes, Route } from "react-router-dom"
import Dictionary from "./Dictionary"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dictionary />}/>
    </Routes>
    </>
  )
}

export default App
