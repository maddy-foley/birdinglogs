import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


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
    const [login, setLogin] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch(
            '/api/birds',
            {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok) {
                console.log('hi')
                navigate('/birds/me')
                window.location.reload();
            } else {
                if(response.status === 401){
                    setLogin(true);
                }
            }
        } catch (e){
            console.log(e)
        }

    }
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

    const getLoginState = async() => {
        const response = await fetch('/api/account/me')
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

    useEffect ( () =>{
        getFamily();
        getLoginState();
    }, [])

    useEffect(() => {}, [formData])

    return(
        <div className="body-page">
        <h1 className="flex font-semibold justify-center sm:text-3xl lg:text-7xl">Create a Bird</h1>
        {
            login ?
                <div className="modal">
                    <div className="modal-textbox">
                        Please Login to add birds: <div className="nav-link mt-3"><NavLink className="text-black"to="/account/login">Login / Sign Up</NavLink></div>
                    </div>
                </div> :
                null
        }
        <form onSubmit={handleSubmit} className="grid grid-cols-11">
            <div className="col-start-5 col-end-9">
                <div className="account-form">
                    <label htmlFor="name">name: </label>
                    <input onChange={handleChange} name="name" required type="text"></input>
                </div>
                <div className="account-form">
                    <label htmlFor="picture_url">picture url: </label>
                    <input onFocus={ (event) => event.target.select()} onChange={handleChange} name="picture_url" placeholder="(optional)" defaultValue={currImage} type="text"></input>
                </div>
                <div className="account-form">
                    <label htmlFor="description">description: </label>
                    <textarea onChange={handleChange} name="description"></textarea>
                </div>
                <div className="account-form">
                    <label htmlFor="family">family: </label>
                    <select name="family" onChange={handleChange} >
                        <option selected={null}>Please Select a Family</option>
                        {
                            families.map( family => {
                                return <option key={family.id}>{family.family}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <button className="nav-link col-start-8" type="submit">Submit</button>
        </form>
        <br></br>
        <div className="flex flex-col items-center">
            <h1 className="mt-10 text-2xl">Bird Picture Preview: </h1>
            <div>
                <img className="bird-img" src={formData.picture_url} alt="link broken or copyrighted"/>
            </div>
        </div>

    </div>
    )
}
