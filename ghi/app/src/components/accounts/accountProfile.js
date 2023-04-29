import { useEffect, useState } from "react"
import { MySightings } from "../sightings/MySightings";
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
        <div className="body-page">
            <div className="flex flex-col items-center">
                <h2 className="flex flex-col items-center text-4xl">Welcome Back {profile.name}</h2>
                <div className="flex justify-start">@{profile.username}</div>
                <img className="bird-img"src={profile.picture_url} alt={profile.username + "image url broken"}/>
                <h2 className="mt-10 text-2xl "> Your sightings: </h2>
            </div>
            <MySightings />
        </div>
    )
}
