
export function Logout() {
    const handleLogout = async (e) =>{
        e.preventDefault();
        const response = await fetch(
            "http://localhost:8000/token", {
                method: "DELETE",
                credentials: 'include',
            })
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
