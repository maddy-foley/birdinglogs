import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = async (e) =>{
        e.preventDefault();
        await fetch(
            "http://localhost:8000/token", {
                method: "DELETE",
                credentials: 'include',
            })
        navigate("/")
        window.location.reload()

    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
