import { useState } from "react"
import { useNavigate } from "react-router-dom";


export function CreateAccount () {
    const currImage = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Catbird_in_Central_Park_%2814585%29.jpg"
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        picture_url: currImage
    });
    const [ask, setAsk] = useState(false)
    const navigate = useNavigate();
    const [taken, setTaken] = useState(false)

    const handleSubmit= async (e) => {
        e.preventDefault();
        if(formData.username.length < 8 || formData.password.length < 8){
            setFormData({
                name: '',
                username: '',
                password: '',
                picture_url: currImage
        })
            setAsk(true)
        }else {
            try{
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
                }


            } catch {
                setTaken(true)
                console.error("error")
            }
        }


    }

    const handleChange = async(e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value})
    }
    return (
        <div className="body-page">
            <h1 className="flex font-semibold justify-center sm:text-3xl lg:text-7xl">Create a User</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-11">
                <div className="col-start-5 col-end-8">
                <div className="account-form">
                    <label htmlFor="name">name: </label>
                    <input onChange={handleChange} name="name" required type="text"></input>
                </div>
                <div className="account-form">
                    <label htmlFor="username">username: </label>
                    <input onChange={handleChange} name="username" required type="text"></input>
                </div>
                <div className="account-form">
                    <label htmlFor="password">password: </label>
                    <input onChange={handleChange} name="password" required type="password"></input>
                </div>
                {
                    ask ? <div>Please make your username and password atleast 8 characters long!</div> :
                    <div></div>
                }
                {
                    taken ? <div className="bg-red-300">Username taken!</div> :
                    <div></div>
                }
                <div className="account-form">
                    <label htmlFor="picture_url">picture url: </label>
                    <input onFocus={ (event) => event.target.select()} onChange={handleChange} name="picture_url" placeholder="(optional)" defaultValue={currImage} type="text"></input>
                </div></div>
                <button className="mybutton col-start-7" type="submit">Sign Up</button>

            </form>
            <br></br>
            <div>
                <h1 className="text-2xl text-extrabold flex justify-center">Profile Picture Preview: </h1>
                <div className="flex justify-center">
                    <img className="bird-img" src={formData.picture_url} alt="link broken or copyrighted"/>
                </div>
            </div>


        </div>
    )
}
