import { useEffect, useState, useParams } from "react"
import { NavLink } from "react-router-dom";


export function BirdDetail () {
    const id = window.location.pathname.split("/")[2]
    const [bird, setBird] = useState({});
    const [sightings, setSightings] = useState([]);


    const getBird = async() => {
        const response = await fetch(`http://localhost:8000/api/birds/${id}`)
        if (response.ok){
            const data = await response.json();
            setBird(data)
        }
    }
    const getSighting = async () => {
        const response = await fetch(`http://localhost:8000/api/birds/${id}/sightings`)
        if (response.ok){
            const data = await response.json();
            setSightings(data)
        }
    }

    useEffect(() => {
        getBird();
        getSighting();
    }, [])


    return (
        <div className="ml-7 mt-3 body-page">
            <h1 className="text-3xl md:text-7xl">{bird.name}</h1>
            <div className="italic md:text-3xl">{bird.family}</div>
            <img src={bird.picture_url}/>
            <p className="">{bird.description}</p>
            <div>
                <NavLink to={"/birds/"+id+"/create-sighting"}>Create Sighting</NavLink>
            </div>
            <h2 className="mt-5 text-2xl md:text-5xl">Recent Sightings:</h2>
            { sightings.length > 0 ? sightings.map(sighting => {
                return (
                    <div key={sighting.id}>
                        <div>{sighting.comment} <span className="text-sm italic">- by {sighting.username}</span></div>
                        <div className="text-sm mb-4">{sighting.spotted_on}</div>
                    </div>
                )})
            : <div>No Sightings</div>
            }
        </div>
    )
}
