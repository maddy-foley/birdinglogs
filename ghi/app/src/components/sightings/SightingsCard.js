import { useState } from "react"
import { DeleteSighting } from "./DeleteSighting"
import { useNavigate } from "react-router-dom";

export function SightingsCard ({sighting}) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    const toDetails = () =>{
        navigate(`/birds/${sighting.bird_id}`)
    }

    const callbackOpen = () =>{
        setIsOpen(false);
    }

    return (
        <>
        <div className="sighting-container m-3 p-3">
        <p className="border-bottom ml-2 mt-2 mb-4"></p>
            <div className="flex flex-col items-end">
            <button onClick={e=> setIsOpen(!isOpen)}><i class="fa-solid fa-trash-can fa-2x"></i></button>
                {
                    isOpen ?
                    <div>
                        <DeleteSighting id={sighting.id}  callback={callbackOpen}/>
                    </div> :
                    null
                }
                <h1 className="text-2xl text-extrabold">{sighting.bird}</h1>
                <div className="text-sm italic">Family: {sighting.family}</div>
            </div>

            <div  onClick={toDetails} className="flex flex-col justify-center items-center m-5">
                <img className="bird-img" src={sighting.picture_url} alt={sighting.bird}/>
                <div>Spotted on: {sighting.spotted_on}</div>
            </div>
            <div className="text-lg px-10"> Notes: <span className="italic">{sighting.comment}</span></div>
        </div>
        </>
    )
}
