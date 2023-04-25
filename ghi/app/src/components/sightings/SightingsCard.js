import { useState } from "react"
import { DeleteSighting } from "./DeleteSighting"
import { useNavigate } from "react-router-dom";


export function SightingsCard ({sighting}) {
    const [isOpen, setIsOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [formData, setFormData] = useState({
        bird_id: sighting.bird_id,
        comment: sighting.comment,
        spotted_on: sighting.spotted_on
    })
    const navigate = useNavigate();

    const toDetails = () =>{
        navigate(`/birds/${sighting.bird_id}`)
    }

    const callbackOpen = () =>{
        setIsOpen(false);
    }

    const handleEdit = async(e) => {
        e.preventDefault();
        formData.spotted_on = new Date(formData.spotted_on)
        const response = await fetch(
            'http://localhost:8000/api/sighting/' + sighting.id,
            {
                method: "PUT",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                window.location.reload();
            }
    }
    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    return (
        <>
        <div className="sighting-container m-3 p-3">
        <p className="border-bottom ml-2 mt-2 mb-4"></p>
            { !editMode ?
            <>
            <div className="flex flex-col items-end pr-5">
                <div className="flex gap-3">
                <button onClick={e=> setEditMode(!editMode)}><i className="fa-solid fa-pen-to-square fa-2x"></i></button>
                <button onClick={e=> setIsOpen(!isOpen)}><i className="fa-solid fa-trash-can fa-2x"></i></button>
                </div>

                {
                    isOpen ?
                    <div>
                        <DeleteSighting id={sighting.id}  callback={callbackOpen}/>
                    </div> :
                    null
                }
                <button onClick={handleEdit}></button>
                <h1 className="text-2xl text-extrabold">{sighting.bird}</h1>
                <div className="text-sm italic">Family: {sighting.family}</div>
            </div>
            <div onClick={toDetails} className="flex flex-col justify-center items-center mx-5 mt-5">
                <img className="bird-img" src={sighting.picture_url} alt={sighting.bird}/>
                <div className="italic px-10">Spotted on: <span className="">{new Date(sighting.spotted_on).toDateString()}</span></div>
            </div>
            <div className="text-lg px-10"><details className="italic"><summary>Notes</summary>{sighting.comment}</details></div>
            </>:
            <>
            <div className="flex justify-end">
                <button onClick={e=> setEditMode(!editMode)} ><i className="fa-solid fa-xmark fa-2x"></i></button>
            </div>
            <form onSubmit={handleEdit}>
                <div className="">
                    <h1 className="text-2xl text-extrabold flex justify-end">{sighting.bird}</h1>
                    <div className="text-sm italic flex justify-end">Family: {sighting.family}</div>
                </div>
                <div className="flex flex-col justify-center items-center m-5">
                    <img className="bird-img" src={sighting.picture_url} alt={sighting.bird}/>
                    <div>Spotted on: </div>
                    <input name="spotted_on" id="spotted_on" onChange={handleChange}  defaultValue={formData.spotted_on} type="date"/>
                </div>
                <div className="text-lg px-10"> Notes: <textarea name="comment" id="comment" onChange={handleChange} className="" defaultValue={formData.comment}/></div>
                <button type="submit">Submit Edit</button>
            </form>
            </>
            }
        </div>
        </>
    )
}
