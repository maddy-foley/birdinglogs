import { useEffect, useState } from "react"
import { BirdCard } from "../components/birds/BirdCard";


export function HomePage(){
    const [catbird, setCatbird] = useState({});

    const getBird = async() => {
        const response = await fetch("http://localhost:8000/api/birds/766")
        if (response.ok){
            const data = await response.json();
            setCatbird(data)
        }
    }
    useEffect(() => {
        getBird();
    }, [])

    return (
        <div className="bg-transparent">
            <div className="flex justify-center">
                <BirdCard bird={catbird}/>
            </div>

        </div>
    )
}
