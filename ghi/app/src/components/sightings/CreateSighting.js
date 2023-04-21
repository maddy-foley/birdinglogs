import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export function CreateSighting(){
    const id = window.location.pathname.split("/")[2]
    const [bird, setBird] = useState({})
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bird_id: id,
        comment: '',
        spotted_on: new Date()
    });


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
        }
}

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    useEffect(() =>{
        const getBird = async() => {
            const response = await fetch(`http://localhost:8000/api/birds/${id}`)
            if (response.ok){
                const data = await response.json();
                setBird(data)
            }
        }
        getBird();
    }, [])

    return(
        <div>
        <h1>Create a Sighting for {bird.name}</h1>
        <img src={bird.picture_url}/>
        <form onSubmit={handleSubmit}>
            <div>
            </div>
            <div>
                <label htmlFor="comment">comment: </label>
                <textarea onChange={handleChange} name="comment" id="comment"></textarea>
            </div>
            <div>
                <label htmlFor="spotted_on">spotted_on: </label>
                <input type="datetime-local" onChange={handleChange} name="spotted_on" id="spotted_on" defaultValue={new Date().toISOString().slice(0,16)}/>
            </div>
            <button className="border">Submit</button>
        </form>
        <br></br>
    </div>
    )
}
