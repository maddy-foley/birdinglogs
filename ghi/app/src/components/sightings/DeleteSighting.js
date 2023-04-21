

export function DeleteSighting({id, callback}) {

    const deleteSighting = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:8000/api/sighting/${id}`,
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
            <p>Are you sure you want to delete sighting?</p>
            <button onClick={deleteSighting}>Yes</button>
            <button onClick={e => callback()}>No</button>
        </div>
    )
}
