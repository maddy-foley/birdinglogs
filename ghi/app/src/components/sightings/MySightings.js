import { useEffect, useState } from "react"
import { SightingsCard } from "./SightingsCard"

export function MySightings() {
    const [sightings, setSightings] = useState([])
    const [indexes, setIndexes] = useState({start: -1, end: 10 })
    const [filteredBirds, setFilteredBirds] = useState([])
    const [search, setSearch] = useState("")

    const leftPage = () =>{
        if(indexes.start<= 0){
            setIndexes({start: 0, end: 10})
        } else {
            setIndexes({start: indexes.start - 10, end: indexes.end - 10})
        }
    }

    const rightPage = () =>{
        const endIdx = filteredBirds.length % 10
        setIndexes({start: indexes.start + 10, end: indexes.end + 10})
        if(indexes.end > filteredBirds.length){
            setIndexes({start: filteredBirds.length-endIdx, end: filteredBirds.length+endIdx})
        }
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
            setSightings(data)
            setFilteredBirds(data)
            console.log(data)
        }
    }

    const filterBirds = async (data) => {
        console.log(data)
        setFilteredBirds(data.filter( data => data.bird.toLowerCase().includes(search.toLowerCase()) || data.family.toLowerCase().includes(search.toLowerCase()) || data.comment.toLowerCase().includes(search.toLowerCase)));
        setIndexes({ start:-1, end: 10 })
    }

    const handleSearch = (event) =>{
        setSearch(event.target.value)
        filterBirds(sightings);
    }

    useEffect(() => {
        getSightings();
    }, [])

    return(
        <div>
            <h1>My sightings:</h1>
            <div className="flex justify-center">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <input onChange={handleSearch} type="text" name="search" id="search" className="p-1" placeholder="Search for birds..."/>
                <button onClick={rightPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div className="grid justify-center">
                {
                    filteredBirds.filter((_, idx) => idx>indexes.start && idx<indexes.end).map(sighting => {
                        return (
                            <div key={sighting.id}>
                                <SightingsCard sighting={sighting}/>
                            </div>
                        )
                    }).reverse()
                }
                <div className="flex justify-center">
                    <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                    <i className="fas fa-crow"></i>
                    <button onClick={rightPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    )
}
