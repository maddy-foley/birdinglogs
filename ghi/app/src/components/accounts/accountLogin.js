import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


export function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();
        const content= `username=${formData.username}&password=${formData.password}`
        const response = await fetch(
            "http://localhost:8000/token", {
                method: "POST",
                body: content,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        if (response.ok) {
            await response.json()
            navigate("/account/profile")
            window.location.reload();

        } else {
            console.error("error")
        }
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(
            {
                ...formData, [name]: value
            }
        );
    };


    return(
        <div className="body-page">
        <h2 className="flex font-semibold justify-center sm:text-3xl lg:text-7xl mb-10">Login</h2>
            <div className="flex items-center justify-center">
                <form>
                    <div className="flex flex-col gap-1 items-end">
                         <div>
                        <input onChange={onChange} name="username"/>
                    </div>
                    <div>
                        <input onChange={onChange} type="password" name="password"/>
                    </div>
                    <div>
                        <button onClick={onSubmit} className="mybutton" name="submit">Login</button>
                    </div>
                    <p className="mt-10 font-semibold">Don't Have an Account?</p>
                    <div>
                        <NavLink to="/account/create" className="mybutton">Create an Account</NavLink>
                    </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

