import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


export function CreateAccount () {
    const currImage = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Catbird_in_Central_Park_%2814585%29.jpg"
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        picture_url: currImage
    });
    const navigate = useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
        const data = JSON.stringify(formData)
        const response = await fetch(
            "http://localhost:8000/api/account/create", {
                method: "POST",
                body: data,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if(response.ok){

            setFormData({
                name: '',
                username: '',
                password: '',
                picture_url: currImage
            })
            navigate("/account/profile")
            window.location.reload()

        } else {
            console.error("error")
        }

    }

    const handleChange = async(e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value})
        console.log(formData)
    }

    return (
        <div className="body-page">
            <h1>Create a User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">name: </label>
                    <input onChange={handleChange} name="name" required type="text"></input>
                </div>
                <div>
                    <label htmlFor="username">username: </label>
                    <input onChange={handleChange} name="username" required type="text"></input>
                </div>
                <div>
                    <label htmlFor="password">password: </label>
                    <input onChange={handleChange} name="password" required type="password"></input>
                </div>
                <div>
                    <label htmlFor="picture_url">picture url: </label>
                    <input onFocus={ (event) => event.target.select()} onChange={handleChange} name="picture_url" placeholder="(optional)" defaultValue={currImage} type="text"></input>
                </div>
                <button className="border" type="submit">Sign Up</button>
            </form>
            <br></br>
            <div>
                <h1>Profile Picture Preview: </h1>
                <div>
                    <img className="bird-img" src={formData.picture_url} alt="link broken or copyrighted"/>
                </div>
            </div>

        </div>
    )
}
