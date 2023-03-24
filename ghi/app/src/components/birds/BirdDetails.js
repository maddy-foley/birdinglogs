import { useEffect, useState, useParams } from "react"


export function BirdDetail () {
    const id = window.location.pathname.split("/")[2]
    const [bird, setBird] = useState({});


    const getBird = async() => {
        const response = await fetch(`http://localhost:8000/api/birds/${id}`)
        if (response.ok){
            const data = await response.json();
            setBird(data)
            console.log(data)
        }
    }

    useEffect(() => {
        getBird();
    }, [])


    return (
        <div>
            <h1 className="text-3xl md:text-7xl">{bird.name}</h1>
            <div className="italic md:text-3xl">{bird.family}</div>
            <img src={bird.picture_url}/>
            <p>{bird.description}</p>
        </div>
    )
}
