


export function BirdCard({bird}) {
    return (
        <div className="flex flex-col border py-7 px-5 m-10 text-right">
            <h1 className="text-2xl text-extrabold">{bird.name}</h1>
            <div className="text-sm italic">Family: {bird.family}</div>
            <p className="border-bottom ml-2 mt-2 mb-4"></p>
            <img className="bird-img" src={bird.picture_url} alt={bird.name}/>
        </div>
    )
}
