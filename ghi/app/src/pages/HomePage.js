import { useEffect, useState } from "react"
import { BirdCard } from "../components/birds/BirdCard";


export function HomePage(){
    const [bird, setBird] = useState({})
    const getBird = async() => {
        const random_number = Math.floor(Math.random() * 980) + 1
        const url = 'http://localhost:8000/api/birds/' + random_number
        const fetchConfig = {
            method: 'GET',
            credentials: 'include',
        }
        const response = await fetch (url, fetchConfig);
        if (response.ok){
            const data = await response.json()
            setBird(data)
        }
    }

    useEffect(() => {
        getBird();
    }, [])
    return (
        <div className="body-page">
            <h1 className="flex font-semibold justify-center sm:text-3xl lg:text-7xl">Welcome to Birding Logs!</h1>
            <div className="flex justify-center mt-10">
                <img className="home-img" src="img/background.png" alt="home-bird"></img>
            </div>
            <p className="border-bottom m-6"></p>
            <h2  className="flex justify-center text-3xl my-5">Discover a New Bird!</h2>
            <div className="flex justify-center">
                <BirdCard bird={bird}/>
            </div>
        </div>
    )
}
