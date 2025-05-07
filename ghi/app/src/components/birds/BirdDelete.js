export function BirdDelete({id, name, callback}) {
    const deleteBird = async(e) =>{
        e.preventDefault();
        const response = await fetch(
            `/api/birds/${id}`,
            {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        if(response.ok){
            window.location.reload();
        }
    }

    return(
        <div className="modal">
            <div className="modal-textbox">
                <p>Are you sure you want to delete {name}</p>
                <div className="flex g-2">
                    <button className="nav-link p-2 text-black" onClick={deleteBird}>Yes</button>
                    <button className="nav-link p-2 text-black" onClick={e => callback()}>No</button>
                </div>
            </div>
        </div>
    )
}
