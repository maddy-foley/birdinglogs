import { useEffect, useState } from "react";

function GetToken () {
    const [token, setToken] = useState({})

    const getToken = async() =>{
        try{
            const response = await fetch('http://localhost:8000/token', {
                credentials: 'include'
            })
            if(response.ok) {
                const data = await response.json()
                console.log(data)
                setToken(data.access_token)
            }
        } catch(err){
            console.error(err)
        }
        return token
    }

    useEffect(()=>{
        getToken();
    }, []);

    return
}

export default GetToken
