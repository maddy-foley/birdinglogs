import { useEffect, useState } from "react"
import { BirdCard } from "../birds/BirdCard"
import { NavLink } from "react-router-dom";

export function MyWishes() {
    const [birds, setBirds] = useState([]);
    const [filteredBirds, setFilteredBirds] = useState([]);
    const [search, setSearch] = useState("");
    const [indexes, setIndexes] = useState({start: -1, end: 10 })

    const leftPage = () =>{
        if(indexes.start< 0){
            setIndexes({start: -1, end: 10})
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

    const getWishes = async () =>{
        const response = await fetch('http://localhost:8000/api/account/me/wishes', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok) {
            const data = await response.json();
            setBirds(data)
            setFilteredBirds(data)
        }
    }

    const filterBirds = async (data) => {
        setFilteredBirds(data.filter( data => data.name.toLowerCase().includes(search.toLowerCase()) || data.family.toLowerCase().includes(search.toLowerCase())));
        setIndexes({ start:-1, end: 10 })
    }

    useEffect(() => {
        getWishes();
    }, [])

    const handleSearch = (event) =>{
        setSearch(event.target.value)
    }

    useEffect(() => {
        filterBirds(birds);
    }, [search])

    return(
    <div className="body-page">
        { birds.length > 0 ?
            <div>
                <div className="flex justify-center">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <input onChange={handleSearch} type="text" name="searchBar" className="p-1" placeholder="Search for birds..."/>
                <button onClick={rightPage} className="nav-link p-1 ml-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 ml-10">
            {
                filteredBirds.filter((_, idx) => idx>indexes.start && idx<indexes.end).map(bird => {
                    return (
                        <div key={bird.id}>
                            <BirdCard bird={bird}/>
                        </div>
                    )
                })
            }</div>
            <div className="flex justify-center mb-10">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <i className="fas fa-crow"></i>
                <button onClick={rightPage} className="nav-link p-1 ml-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        :
        <div>Go to <NavLink to="/birds">All Birds</NavLink>  and add birds to your List!</div>}
    </div>
)
}
