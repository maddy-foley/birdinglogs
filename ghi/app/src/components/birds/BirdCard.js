import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getToken from "../Token";

export function BirdCard({bird}) {
    const [wish, setWish] = useState(bird.wish);
    const [ask, setAsk] = useState(false);

    const navigate = useNavigate();

    const toDetails = () =>{
        navigate(`/birds/${bird.id}`)
    }

    const handleLike = async() => {
        const data = await getToken();
        setTimeout(() => {
            console.log("Delayed for 1 second.");
          }, "1000")
        if(data){
            setWish(!wish);

            if (wish){
                const response = await fetch(
                    `http://localhost:8000/api/birds/${bird.id}/wishes`,
                    {
                        method: "DELETE",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(bird)
            } else {
                const response = await fetch(`http://localhost:8000/api/birds/${bird.id}/wishes`,
                    {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(bird)
            }

        } else {
            setAsk(true)
        }
    }

    return (
        <div className="flex flex-col bird-card py-7 px-5 m-10 text-right">
            <h1 className="text-2xl text-extrabold">{bird.name}</h1>
            {
                wish ?
                    <button className="z-10 bg-slate-50" onClick={handleLike}><div><i className="fa-solid fa-heart"></i></div></button>:
                    <button className="z-10 bg-slate-50" onClick={handleLike}><div><i className="fa-regular fa-heart"></i></div></button>
            }
            {
                ask ?
                    <div classNam="modal">
                        Please Login to add wishes:
                        <NavLink to="/account/login">Login / Sign Up</NavLink>
                    </div> :
                    null
            }
            <div className="text-sm italic">Family: {bird.family}</div>
            <p className="border-bottom ml-2 mt-2 mb-4"></p>
            <div className="flex justify-center">
                <img onClick={toDetails}  className="bird-img" src={bird.picture_url} alt={bird.name}/>
            </div>
            <div>Sightings: {bird.sightings}</div>
        </div>
    )
}
