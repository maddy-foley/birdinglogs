import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Logout } from "./accounts/AccountLogout"
import getToken from "./Token"


export function Navbar(){
    const [isLogged, setIsLogged] = useState(false)
    const [open, setOpen] = useState(true)

    const myToken  = async () =>{
        const data = await getToken();
        if(data){
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }
    const isOpen = () =>{
        setOpen(!open)
        console.log(open)
    }

    useEffect(() => {
        myToken();
    }, [])

    return(
        <div className="nav-bar p-5 mb-5 z-10">
            <div className="flex">
            {
                open ?
                <div className="flex">
                    <div className="sm:grid gap-1 lg:flex gap-1">
                        <div className="nav-link">
                            <NavLink to="/">Home</NavLink>
                        </div>
                        <div className="nav-link">
                            <NavLink to="/birds">All Birds</NavLink>
                        </div>
                        {
                        isLogged ?
                        <>
                            <div className="nav-link">
                                <NavLink to="/birds/me">My Birds</NavLink>
                            </div>
                            <div className="nav-link">
                                <NavLink to="/account/profile">My Profile</NavLink>
                            </div>
                            <div className="nav-link">
                                <NavLink to="/wishes/me">My WishList</NavLink>
                            </div>

                        </> :
                        <></>
                        }
                    </div>
                    <div className="login-sm lg:login-lg">
                        {   isLogged ?
                                <div className="nav-link">
                                    <Logout />
                                </div>
                                :
                                <div className="nav-link">
                                    <NavLink to="/account/login">Login / Sign Up</NavLink>
                            </div>
                        }
                    </div>
                </div> :
                    <div></div>
                }
                {
                    open?
                    <div className="absolute right-2">
                    <button className=" nav-link"onClick={isOpen}>
                        <i className="toggle-button fas fa-bars fa-2x"></i>
                    </button>
                    </div>:
                    <div className="absolute right-2">
                    <button className=" nav-link"onClick={isOpen}>
                        <i className="toggle-button fas fa-bars"></i>
                    </button>
                </div>
                }
            </div>
        </div>
    )
}
