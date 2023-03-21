import { useState, useEffect } from "react"
import { BirdCard } from "./BirdCard"

export function BirdList() {
    const [birds, setBirds] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/birds')
        if (response.ok){
            const data = await response.json();
            setBirds(data)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return(
        <div className="grid">
            { birds.map(bird => {
                return(
                    <BirdCard className="col-start-2 col-span-3" key={bird.id} bird={bird} />
                )
            })
            }
        </div>
    )
}
