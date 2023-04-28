import { NavLink, useNavigate } from "react-router-dom";
import { useState} from "react";
import getToken from "../Token";
import { BirdDelete } from "./BirdDelete";


export function BirdCard({bird, mine}) {
    const [wish, setWish] = useState(bird.wish);
    const [ask, setAsk] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
                await fetch(
                    `http://localhost:8000/api/birds/${bird.id}/wishes`,
                    {
                        method: "DELETE",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            } else {
                await fetch(`http://localhost:8000/api/birds/${bird.id}/wishes`,
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
    const callbackOpen = () =>{
        setIsOpen(false);
    }

    return (
        <div className="bird-card m-3">
            <div className="p-3">
                <div className="flex justify-end">
                {
                    mine ?
                    <div className="flex gap-2 pr-1">
                        <NavLink to={"/birds/" + bird.id + "/edit"} state={bird}><i className="fa-solid fa-pen-to-square fa-2x"></i></NavLink>
                        <button onClick={e=> setIsOpen(!isOpen)}><i className="fa-solid fa-trash-can fa-2x"></i></button>
                {
                    isOpen ?
                    <div>
                        <BirdDelete id={bird.id} name={bird.name} callback={callbackOpen}/>
                    </div> :
                    null
                }
                    </div> :
                   <></>
                }
               {
                wish ?
                    <button className="z-9" onClick={handleLike}><div><i className="fa-solid fa-heart fa-2x heart"></i></div></button> :
                    <button className="z-9" onClick={handleLike}><div><i className="fa-regular fa-heart fa-2x heart"></i></div></button>
                }
            {
                ask ?
                    <div className="modal">
                        <div className="modal-textbox">
                            Please Login to add wishes: <div className="nav-link mt-3"><NavLink className="text-black"to="/account/login">Login / Sign Up</NavLink></div>
                        </div>
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
                        <div className=""> Site Sightings: {bird.sightings}</div>
                    </div>
            </div>
                <div className=" flex justify-center my-3">
                    <NavLink className="mybutton" to={"/birds/"+bird.id+"/create-sighting"}>Create Sighting</NavLink>
                </div>
        </div>
        </div>
    )
}
