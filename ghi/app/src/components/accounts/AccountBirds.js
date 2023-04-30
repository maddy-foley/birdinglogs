import { useEffect, useState } from "react";
import { BirdCard } from "../birds/BirdCard";
import { NavLink } from "react-router-dom";

export function MyBirds() {
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
        const response = await fetch('http://localhost:8000/api/birds/me', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.ok){
            const data = await response.json();
            setBirds(data);
            setFilteredBirds(data);
        }
    }
    const filterBirds = async (data) => {
        setFilteredBirds(data.filter( data => data.name.toLowerCase().includes(search.toLowerCase()) || data.family.toLowerCase().includes(search.toLowerCase())));
        setIndexes({ start:-1, end: 10 })
    }


    useEffect(() => {
        getData();
    }, [])

    const handleSearch = (event) =>{
        setSearch(event.target.value)
        filterBirds(birds);
    }

    return(
        <div className="body-page">
        <div className="grid justify-center">
            <div className="flex justify-center">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <input onChange={handleSearch} type="text" name="searchBar" className="p-1" placeholder="Search for birds..."/>
                <button onClick={rightPage} className="nav-link p-1 ml-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            {
                birds.length > 0?
                filteredBirds.filter((_, idx) => idx>indexes.start && idx<indexes.end).map(bird => {
                    return (
                        <div key={bird.id}>
                            <BirdCard bird={bird} mine={true}/>
                        </div>
                    )
                }) :
                <div>
                    <div className="flex font-semibold justify-center sm:text-3xl lg:text-7xl">You have no Birds!</div>
                    <div className="text-2xl warning">Any birds you add will NOT appear in other's all birds list but they can still accessed it via url.</div>
                    <div className="warning mb-10">Please only post tests or bird content.</div>
                    <div className="flex font-semibold justify-center mb-5 sm:text-3xl lg:text-5xl">
                        <NavLink className="mybutton" to="/birds/create">Add a Bird</NavLink>
                    </div>
                </div>
            }
            <div className="flex justify-center">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <i className="fas fa-crow"></i>
                <button onClick={rightPage} className="nav-link p-1 ml-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
        </div>
    )
}
