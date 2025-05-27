import MiniLoadingIcon from "@/components/customcomponents/mini-loading-icon"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserContext } from "@/context/userContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export const LoginPage = () => {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_BASE_URL
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setUser} = useContext(UserContext)
    const [waiting, setWaiting] = useState(false)


    const loginRequest = async () => {
        // console.log(`username:${username}, password:${password}`)
        if (!username || !password) {
            alert("Please fill in all fields")
            return
        }
        if (waiting) {
            alert("Please wait for the previous request to complete")
            return
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long")
            setWaiting(false)
            return
        }
        setWaiting(true)
        try {
            const res = await fetch(`${API}/users/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                },
            )
            const response = await res.json()
            setWaiting(false)
            // console.log(response)
            // alert(response.message)
            toast(response.message, {
                description: response.success ? "Login successful" : "Failed to login",
                duration: 3000,
                variant: response.success ? "success" : "destructive"
            })
            if(response.success){
                localStorage.setItem("accessToken", response.data.accessToken)
                setUser(response.data.user)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/dashboard")
            }
        } catch (error) {
            setWaiting(false)
            // alert(error)
            console.error(error)
        }
    }


    return <div className="bg-slate-400 flex items-center justify-center h-screen">
        <Card>
            <CardHeader>
                <CardTitle>User Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" placeholder="username or email" onChange={(e)=>{setUsername(e.target.value)}} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Password</Label>
                            <Input type="password" id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
            <Button onClick={loginRequest} variant="default">Submit</Button>
            {waiting && <MiniLoadingIcon />}
            <a className="block text-sm underline" href="/request-otp">Forget password</a>
            </CardFooter>
        </Card>
    </div>
}