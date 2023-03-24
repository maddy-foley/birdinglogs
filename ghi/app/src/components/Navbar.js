import { NavLink } from "react-router-dom"


export function Navbar(){
    return(
        <div className="nav-header">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/birds">Birds</NavLink>
        </div>
    )
}
