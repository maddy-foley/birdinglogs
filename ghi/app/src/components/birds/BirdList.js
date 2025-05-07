import { useState, useEffect } from "react"
import { NavLink} from "react-router-dom";
import { BirdCard } from "./BirdCard"



export function BirdList() {
    const [birds, setBirds] = useState([]);
    const [filteredBirds, setFilteredBirds] = useState([]);
    const [search, setSearch] = useState("");
    const [indexes, setIndexes] = useState({start: -1, end: 10 })
    const [families, setFamilies] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState("");


    const leftPage = () =>{
        if(indexes.start<= 0){
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

    const getData = async () => {
        const url = '/api/birds'
        const fetchConfig = {
            method: 'GET',
            credentials: 'include',
        }
        const response = await fetch (url, fetchConfig);

        if (response.ok){
            const data = await response.json();
            setBirds(data);
            setFilteredBirds(data);
        }
    }
    const filterBirds = (data) => {
        let newBirds = [...data]
        if(selectedFamily === ""){
            newBirds = [...data.filter( data => data.name.toLowerCase().includes(search.toLowerCase()) || data.family.toLowerCase().includes(search.toLowerCase()))];
        } else {
            newBirds = [...data.filter( data => (data.name.toLowerCase().includes(search.toLowerCase()) || data.family.toLowerCase().includes(search.toLowerCase())) && (data.family === selectedFamily))];
        }
        setIndexes({ start:-1, end: 10 })
        setFilteredBirds([...newBirds])
    }

    const getFamily = async() => {
        const response = await fetch('/api/family')
        if(response.ok){
            const data = await response.json()
            setFamilies(data)
        }
    }
    const handleSearch = (e) =>{
        setSearch(e.target.value);
    }
    const handleChange = (e) =>{
        if(e.target.value === "All Birds"){
            setFilteredBirds([...birds])
        } else {
            setSelectedFamily(e.target.value);
        }
    }

    useEffect(() => {
        getData();
        getFamily();
    }, []);

    useEffect(() =>{
        filterBirds(birds);
    }, [search, selectedFamily])

    return(
        <div className="body-page">
            <div className="flex justify-center">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <input onChange={handleSearch} type="text" name="searchBar" className="p-1" placeholder="Search for birds..."/>
                <button onClick={rightPage} className="nav-link p-1 ml-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div>
                <NavLink className="mybutton" to="/birds/create">Add a Bird</NavLink>
            </div>
            <div>
                <select name="family" id="family" className="mt-3" onChange={handleChange}>
                    <option selected={null}>All Birds</option>
                    {
                        families.map( family => {
                            return <option key={family.id}>{family.family}</option>
                        })
                    }
                </select>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
                {
                filteredBirds.filter((_, idx) => idx>indexes.start && idx<indexes.end).map(bird => {
                    return (
                        <div key={bird.id}>
                            <BirdCard bird={bird}/>
                        </div>
                    )
                })
            }
            </div>

            <div className="flex justify-center">
                <button onClick={leftPage} className="nav-link p-1 mr-2"><i className="fa-solid fa-arrow-left"></i></button>
                <i className="fas fa-crow"></i>
                <button onClick={rightPage} className="nav-link p-1 ml-2"><i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}
