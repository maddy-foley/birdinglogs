import { NavLink } from "react-router-dom"
import { Logout } from "./accounts/accountLogout"
import { useCookies } from "react-cookie"


export function Navbar(){
    const [cookie,] = useCookies(["fastapi_token"]);

    return(
        <div className="flex nav-header m-3">
            <div className="nav-link">
                <NavLink to="/">Home</NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/birds">Birds</NavLink>
            </div>
            { cookie.fastapi_token ? (
                <div className="nav-link">
                    <Logout />
                </div>
                ) : (
                <div>
                    <NavLink to="/account/login">Login</NavLink>
                </div>
                )
            }

        </div>
    )
}
