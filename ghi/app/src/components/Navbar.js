import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Logout } from "./accounts/AccountLogout"
import getToken from "./Token"


export function Navbar(){
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate();

    const myToken  = async () =>{
        const data = await getToken();
        if(data){
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }

    useEffect(() => {
        myToken();
    }, [])

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
            {
                isLogged ?
                <Logout /> :
                <NavLink to="/account/login">Login</NavLink>
            }
        </div>
    )
}
