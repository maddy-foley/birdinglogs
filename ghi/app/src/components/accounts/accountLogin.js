import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })


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
            const data = await response.json()
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
        <div>
            <form>
                <div>
                    <input onChange={onChange} name="username"/>
                </div>
                <div>
                    <input onChange={onChange} type="password" name="password"/>
                </div>
                <div>
                    <button onClick={onSubmit} className="border" name="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
