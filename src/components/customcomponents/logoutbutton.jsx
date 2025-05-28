import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { UserContext } from "@/context/userContext"
import { toast } from "sonner"

export const LogoutButton = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)
    const [waiting, setWaiting] = useState(false)

    if(!(user && user?._id)){
        return <Button onClick={()=>{navigate("/login")}}>Login</Button>
    }

    const logoutRequest = async () => {
        if(waiting) {
            alert("Please wait for the previous request to complete")
            return
        }
        setWaiting(true)
        const toastId = toast("Logging out...", {
            id: "logout-toast",
            duration: Infinity,
            description: "Please wait while we log you out.",
        })
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
            // console.log(response)
            setUser(null)
            localStorage.removeItem("user")
            setWaiting(false)
            toast.dismiss("logout-toast") // Dismiss the toast
            navigate("/login")
        } catch (error) {
            setWaiting(false)
            toast.dismiss("logout-toast") // Dismiss the toast on error as well
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