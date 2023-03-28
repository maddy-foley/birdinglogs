import { useEffect, useState } from "react"
import getToken from "../Token";


export function Profile() {
    const [profile, setProfile] = useState({})
    const [token, setToken] = useState('')
    const getData = async() =>{
        const auth = await getToken();
        setToken(auth)
        const url = 'http://localhost:8000/api/account/me'
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            },
            credentials: 'include',
        }
        const response = await fetch (url, fetchConfig);
        if (response.ok){
            const data = await response.json();
            setProfile(data)
        }
    }


    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <h2>Welcome Back {profile.name}</h2>
            <div>@{profile.username}</div>
            <img className="bird-img"src={profile.picture_url} alt={profile.name}/>
        </div>
    )
}
