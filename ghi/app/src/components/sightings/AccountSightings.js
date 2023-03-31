import { useEffect, useState } from "react"
import { SightingsCard } from "./SightingsCard"


export function MySightings() {
    const [sightings, setSightings] = useState([])
    const getSightings = async () =>{
        const response = await fetch('http://localhost:8000/api/sighting/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok) {
            const data = await response.json();
            setSightings(data)
            console.log(data)
        }
    }
    useEffect(() => {
        getSightings();
    }, [])

    return(
        <div>
            {
                sightings.map(sighting => {
                    return (
                        <div key={sighting.id}>
                            <SightingsCard sighting={sighting}/>
                        </div>
                    )
                })

            }
        </div>
    )
}
