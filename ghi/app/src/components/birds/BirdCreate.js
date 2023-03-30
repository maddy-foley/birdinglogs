import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export function CreateBird() {
    const navigate = useNavigate();
    const currImage = "https://upload.wikimedia.org/wikipedia/commons/9/9b/House_sparrow_male_in_Prospect_Park_%2853532%29.jpg"
    const [families, setFamilies] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        family: 'Ducks, Geese, and Swans',
        description: '',
        picture_url: currImage
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = fetch(
            'http://localhost:8000/api/birds',
            {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok) {
                const data = await response.json()
                setFamilies({
                    name:'',
                    family: 'Ducks, Geese, and Swans',
                    description: '',
                    picture_url: currImage
                })
                navigate("/account/profile")
                window.location.reload()
            }
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }
    
    const getFamily = async() => {
        const response = await fetch('http://localhost:8000/api/family')
        if(response.ok){
            const data = await response.json()
            setFamilies(data)
        }
    }

    useEffect ( () =>{
        getFamily();
    }, [])

    return(
        <div>
        <h1>Create a Bird</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">name: </label>
                <input onChange={handleChange} name="name" required type="text"></input>
            </div>
            <div>
                <select name="family" onChange={handleChange} >
                    {
                        families.map( family => {
                            return <option key={family.id}>{family.family}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="description">description: </label>
                <textarea onChange={handleChange} name="description"></textarea>
            </div>
            <div>
                <label htmlFor="picture_url">picture url: </label>
                <input onFocus={ (event) => event.target.select()} onChange={handleChange} name="picture_url" placeholder="(optional)" defaultValue={currImage} type="text"></input>
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
}
