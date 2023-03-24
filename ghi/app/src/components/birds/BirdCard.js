import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function BirdCard({bird}) {
    const [sightings, setSightings] = useState([]);

    const navigate = useNavigate();

    const getSighting = async () => {
        const response = await fetch(`http://localhost:8000/api/birds/${bird.id}/sightings`)
        if (response.ok){
            const data = await response.json();
            setSightings(data)
        }
    }

    const toDetails = () =>{
        navigate(`/birds/${bird.id}`, sightings)
    }

    useEffect(() => {
        getSighting();
    }, [])

    return (
        <div onClick={toDetails} className="flex flex-col border py-7 px-5 m-10 text-right">
            <h1 className="text-2xl text-extrabold">{bird.name}</h1>
            <div className="text-sm italic">Family: {bird.family}</div>
            <p className="border-bottom ml-2 mt-2 mb-4"></p>
            <img className="bird-img" src={bird.picture_url} alt={bird.name}/>
            <div>sightings: {sightings.length}</div>
        </div>
    )
}
