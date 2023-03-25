import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function BirdCard({bird}) {
    const [sightingCount, setSightingCount] = useState(0);
    const navigate = useNavigate();

    const getSightingCount = async () =>{
        const response = await fetch(`http://localhost:8000/api/birds/${bird.id}/sightings/count`)
        if(response.ok){
            const data = await response.json();
           setSightingCount(data)
        }
    }

    useEffect(() => {
        getSightingCount();
    }, [])

    const toDetails = () =>{
        navigate(`/birds/${bird.id}`)
    }

    return (
        <div onClick={toDetails} className="flex flex-col bird-card py-7 px-5 m-10 text-right">
            <h1 className="text-2xl text-extrabold">{bird.name}</h1>
            <div className="text-sm italic">Family: {bird.family}</div>
            <p className="border-bottom ml-2 mt-2 mb-4"></p>
            <div className="flex justify-center">
                <img className="bird-img" src={bird.picture_url} alt={bird.name}/>
            </div>
            <div>Sightings: {sightingCount}</div>
        </div>
    )
}
