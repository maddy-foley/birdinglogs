import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


export function BirdEdit () {
    const location = useLocation();
    const {state} = location;
    const [families, setFamilies] = useState([])
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: state.name,
        family: state.family,
        description: state.description,
        picture_url: state.picture_url
    })

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    const getFamily = async() => {
        const response = await fetch('/api/family')
        if(response.ok){
            const data = await response.json()
            setFamilies(data)
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(
            '/api/birds/' + state.id,
            {
                method: "PUT",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if(response.ok) {
            console.log(await response.json())
            navigate('/birds/' + state.id)
            window.location.reload();
        }
    }
    useEffect ( () =>{
        getFamily();
    }, [])

    return(
        (
            <div className="grid grid-cols-2 body-page">
            <h1>Edit {formData.name}:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">name: </label>
                    <input onChange={handleChange} name="name" id="name" required defaultValue={formData.name} type="text"></input>
                </div>
                <div>
                    <select name="family" id="family" value={formData.family} onChange={handleChange} >
                        {
                            families.map( family => {
                                return <option key={family.id}>{family.family}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="description">description: </label>
                    <textarea onChange={handleChange} name="description" id="description"></textarea>
                </div>
                <div>
                    <label htmlFor="picture_url">picture url: </label>
                    <input onFocus={ (event) => event.target.select()} onChange={handleChange} id="picture_url" name="picture_url" placeholder="(optional)" type="text"></input>
                </div>
                <button className="border" type="submit">Submit</button>
            </form>
            <br></br>
            <div>
                <h1>Bird Picture Preview: </h1>
                <div>
                    <img className="bird-img" src={formData.picture_url} alt="link broken or copyrighted"/>
                </div>
            </div>

        </div>
        )
    )
}
