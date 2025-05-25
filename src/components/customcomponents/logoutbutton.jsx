import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"

export const LogoutButton = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    if(!(user && user?._id)){
        return <Button onClick={()=>{navigate("/login")}}>Login</Button>
    }

    const logoutRequest = async () => {
        try {
            const res = await fetch(`${API}/users/logout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                },
            )
            const response = await res.json()
            console.log(response)
            setUser(null)
            localStorage.removeItem("user")
            navigate("/login")
        } catch (error) {
            console.log(error)
            setUser(null)
            localStorage.removeItem("user")
            navigate("/login")
        }
    }

    return <div>
        <Button onClick={logoutRequest} variant="destructive" >Logout</Button>
    </div>
}