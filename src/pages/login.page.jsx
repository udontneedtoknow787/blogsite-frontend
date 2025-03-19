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


export const LoginPage = () => {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_BASE_URL
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setUser} = useContext(UserContext)


    const loginRequest = async () => {
        console.log(`username:${username}, password:${password}`)
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
            console.log(response)
            alert(response.message)
            if(response.success){
                localStorage.setItem("accessToken", response.data.accessToken)
                setUser(response.data.user)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/dashboard")
            }
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }


    return <div className="bg-slate-400 dark flex items-center justify-center h-screen">
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
            <CardFooter>
            <Button onClick={loginRequest} variant="default">Submit</Button>
            </CardFooter>
        </Card>
    </div>
}