import { useEffect, useState } from "react"
import { SightingsCard } from "./SightingsCard"


export function MySightings() {
    const [sightings, setSightings] = useState([])
    const [indexes, setIndexes] = useState({start: -1, end: 10 })

    const leftPage = () =>{
        if(indexes.start<0){
            setIndexes({start: -1, end: 10})
        } else {
            setIndexes({start: indexes.start - 10, end: indexes.end - 10})
        }

    }

    const rightPage = () =>{
        if(indexes.end < sightings.length){
            setIndexes({start: sightings.length-10, end: sightings.length})
        } else {
            setIndexes({start: indexes.start + 10, end: indexes.end + 10})
        }
        console.log(indexes)
    }

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
            setSightings(data.reverse())
        }
    }
    useEffect(() => {
        getSightings();
    }, [])

    return(
        <div>
            <h1>My sightings:</h1>
            {
                sightings.map(sighting => {
                    return (
                        <div key={sighting.id}>
                            <SightingsCard sighting={sighting}/>
                        </div>
                    )
                }).reverse()

            }
        </div>
    )
}
