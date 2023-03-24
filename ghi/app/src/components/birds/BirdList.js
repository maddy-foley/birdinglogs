import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { BirdCard } from "./BirdCard"


export function BirdList() {
    const [birds, setBirds] = useState([]);
    const [filteredBirds, setFilteredBirds] = useState([]);
    const [search, setSearch] = useState("");
    const [indexes, setIndexes] = useState({start: -1, end: 10 })

    const leftPage = () =>{
        if(indexes.start<0){
            setIndexes({start: -1, end: 10})
        } else {
            setIndexes({start: indexes.start - 10, end: indexes.end - 10})
        }

    }

    const rightPage = () =>{
        if(indexes.end > filterBirds.length){
            setIndexes({start: filteredBirds.length-10, end: filteredBirds.length})
        } else {
            setIndexes({start: indexes.start + 10, end: indexes.end + 10})
        }

    }

    const getData = async () => {
        const response = await fetch('http://localhost:8000/api/birds')
        if (response.ok){
            const data = await response.json();
            setBirds(data);
            setFilteredBirds(data);
        }
    }
    const filterBirds = async (data) => {
        setFilteredBirds(data.filter( data => data.name.toLowerCase().includes(search) || data.family.toLowerCase().includes(search)));
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
            <button onClick={leftPage}>Left</button>
            <button onClick={rightPage}>Right</button>
            <input onChange={handleSearch} type="text" name="searchBar" placeholder="Search for birds..."/>
            {
                filteredBirds.filter((_, idx) => idx>indexes.start && idx<indexes.end).map(bird => {
                    return (
                        <div>
                            <BirdCard key={bird.id} bird={bird}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
