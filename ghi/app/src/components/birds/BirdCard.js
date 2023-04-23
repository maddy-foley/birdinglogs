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
            } else {
                const response = await fetch(`http://localhost:8000/api/birds/${bird.id}/wishes`,
                    {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            }

        } else {
            setAsk(true)
        }
    }

    return (
        <div className="bird-card m-3">
            <div className="p-3">
                <div className="flex justify-end">
               {
                wish ?
                    <button className="z-10" onClick={handleLike}><div><i className="fa-solid fa-heart fa-2x heart"></i></div></button>:
                    <button className="z-10" onClick={handleLike}><div><i className="fa-regular fa-heart fa-2x heart"></i></div></button>
            }
            {
                ask ?
                    <div classNam="modal">
                        Please Login to add wishes:
                        <NavLink to="/account/login">Login / Sign Up</NavLink>
                    </div> :
                    null
            }
            </div>
            <div onClick={toDetails} className="">
                <h1 className="text-2xl text-extrabold flex justify-center">{bird.name}</h1>
                    <div className="text-sm italic flex justify-center">Family: {bird.family}</div>
                    <p className="border-bottom ml-2 mt-2 mb-4"></p>
                    <div className="card-content">
                        <div className="m-5">
                            <img src={bird.picture_url} alt={bird.name}/>
                        </div>
                        <div className="">Sightings: {bird.sightings}</div>
                    </div>
            </div>
        </div>
        </div>
    )
}
