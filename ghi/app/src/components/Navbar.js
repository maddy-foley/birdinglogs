import { NavLink } from "react-router-dom"


export function Navbar(){
    return(
        <div className="flex nav-header m-3">
            <div className="nav-link">
                <NavLink to="/">Home</NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/birds">Birds</NavLink>
            </div>
        </div>
    )
}
