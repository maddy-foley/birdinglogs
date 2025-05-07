import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = async (e) =>{
        e.preventDefault();
        await fetch(
            "/api/token", {
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
