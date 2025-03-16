import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


export function CreateSighting(){
    const id = window.location.pathname.split("/")[2]
    const [bird, setBird] = useState({})
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bird_id: id,
        comment: '',
        spotted_on: new Date().toISOString().slice(0, 10)
    });
    const [login, setLogin] = useState(false);

    const getLoginState = async() => {
        const response = await fetch('http://localhost:8000/api/account/me')
        if(response.ok){

            const data = await response.json()
            console.log(data)
            setLogin(false)
        } else {
            if (response.status == 401){
                {
                    setLogin(true)
                }
            }
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(
            'http://localhost:8000/api/sighting',
            {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if(response.ok) {
            navigate(`/birds/${id}`)
        } else {
            if(response.status === 401){
                setLogin(true);
            }
        }

}

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }
    const getBird = async() => {
        const response = await fetch(`http://localhost:8000/api/birds/${id}`)
        if (response.ok){
            const data = await response.json();
            setBird(data)
        }
    }
    useEffect(() =>{
        getBird();
        getLoginState();
    }, [])

    return(
        <div className="body-page">
        <h1 className="font-semibold text-3xl">Create a Sighting for {bird.name}</h1>
        {
            login ?
                <div className="modal">
                    <div className="modal-textbox">
                        Please Login to add sighting: <div className="nav-link mt-3"><NavLink className="text-black"to="/account/login">Login / Sign Up</NavLink></div>
                    </div>
                </div> :
                null
        }
        <img src={bird.picture_url} alt={bird.name}/>
        <form onSubmit={handleSubmit} className="mt-5">
            <div>
            </div>
            <div>
                <label htmlFor="comment">Note: </label>
                <textarea onChange={handleChange} name="comment" id="comment"></textarea>
            </div>
            <div>
                <label htmlFor="spotted_on">Spotted On: </label>
                <input name="spotted_on" id="spotted_on" onChange={handleChange}  defaultValue={formData.spotted_on} type="date"/>
            </div>
            <button className="nav-link">Submit</button>
        </form>
        <br></br>
    </div>
    )
}
