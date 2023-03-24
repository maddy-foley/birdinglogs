import { useState, useEffect } from "react"
import { BirdCard } from "./BirdCard"

export function BirdList() {
    const [birds, setBirds] = useState([]);
    const [filteredBirds, setFilteredBirds] = useState([]);
    const [search, setSearch] = useState("");

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/birds')
        if (response.ok){
            const data = await response.json();
            setBirds(data);
            setFilteredBirds(data);
        }
    }
    const filterBirds = async (data) => {
        setFilteredBirds(
            data.filter( data => data.name.toLowerCase().includes(search) || data.family.toLowerCase().includes(search))
        );
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSearch = (event) =>{
        setSearch(event.target.value.toLowerCase())
        filterBirds(birds);
    }

    return(
        <div className="">
            <input onChange={handleSearch} type="text" name="searchBar"/>
            {
                filteredBirds.map( bird => {
                    return (
                            <BirdCard key={bird.id} bird={bird}/>
                    )
                })
            }
        </div>
    )
}
