import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = async (e) =>{
        e.preventDefault();
        const response = await fetch(
            "http://localhost:8000/token", {
                method: "DELETE",
                credentials: 'include',
            })
        window.location.reload()
        navigate("/")
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
