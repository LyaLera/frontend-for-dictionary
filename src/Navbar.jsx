import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
        <div className="nav-div">
          <NavLink className="link" to="/">My Dictionary</NavLink>
        </div>
        <div className="nav-div">
          <NavLink className="link" to="/AddWord">Add new word</NavLink>
        </div>
        </nav>
    )
} 