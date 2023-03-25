import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8000/token'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
        }
        console.log(formData)
        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            const user = await response.json()
            console.log(user)
            setFormData([])
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
        console.log(formData)
    };

    useEffect(() => {
        onSubmit();
    }, [])


    return(
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input onChange={onChange} name="username"/>
                </div>
                <div>
                    <input onChange={onChange} type="password" name="password"/>
                </div>
                <div>
                    <button className="border">Login</button>
                </div>
            </form>
        </div>
    )
}
