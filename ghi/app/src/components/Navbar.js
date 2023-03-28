import { NavLink } from "react-router-dom"
import { Logout } from "./accounts/accountLogout"
import { GetToken } from "./Token"


export function Navbar(){


    return(
        <div className="flex nav-header m-3">
            <div className="nav-link">
                <NavLink to="/">Home</NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/birds">Birds</NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/account/profile">My Profile</NavLink>
            </div>
            {/* { tok ? (
                // <div className="nav-link">
                //     <Logout />
                // </div>
                ) : (

                )
            } */}
            <div>
                <NavLink to="/account/login">Login</NavLink>
            </div>
        </div>
    )
}
