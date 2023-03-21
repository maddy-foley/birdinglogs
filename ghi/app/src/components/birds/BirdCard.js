export function BirdCard({bird}) {
    return (
        <div className="">
            <div>{bird.name}</div>
            <div>{bird.family}</div>
            <div></div>
            <img className="bird-img" src={bird.picture_url} alt={bird.name}/>
        </div>
    )
}
