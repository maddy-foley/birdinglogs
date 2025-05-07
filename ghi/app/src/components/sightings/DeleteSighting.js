

export function DeleteSighting({id, callback}) {

    const deleteSighting = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `/api/sighting/${id}`,
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

    return (
        <div className="modal">
            <div className="modal-textbox">
                <p>Are you sure you want to delete sighting?</p>
                <div className="flex g-2">
                    <button className="nav-link p-2 text-black" onClick={deleteSighting}>Yes</button>
                    <button className="nav-link p-2 text-black" onClick={e => callback()}>No</button>
                </div>

            </div>

        </div>
    )
}
