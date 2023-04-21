import { DeleteSighting } from "./DeleteSighting"

export function SightingsCard ({sighting}) {
    return (
        <>
        <div className="flex flex-col bird-card py-7 px-5 m-10 text-right">
            <h1 className="text-2xl text-extrabold">{sighting.bird}</h1>
            <div className="text-sm italic">Family: {sighting.family}</div>
            <button onClick={<DeleteSighting id={sighting.id}/>}>Delete</button>
            <p className="border-bottom ml-2 mt-2 mb-4"></p>
            <div className="flex justify-center">
                <img className="bird-img" src={sighting.picture_url} alt={sighting.bird}/>
                <div>{sighting.comment}</div>
            </div>
            <div>Spotted on: {sighting.spotted_on}</div>
        </div>
        </>
    )
}
