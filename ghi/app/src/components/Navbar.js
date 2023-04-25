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
                <div className="flex justify-end mb-1">
                    <button className=" nav-link"onClick={isOpen}>
                        <i className="toggle-button fas fa-bars fa-2x"></i>
                    </button>
                </div>
            {
                open ?
                <div className="grid grid-cols-3">
                    <div className="col-span-2 flex gap-4">
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
                <div className="flex col-start-4">
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
        </div>
    )
}
