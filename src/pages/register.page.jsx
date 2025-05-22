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

export const RegisterPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const registerRequest = async () => {
        // console.log(`username:${username}, password:${password}`)
        try {
            const res = await fetch(`${API}/users/register`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        fullname: fullname
                    }),
                },
            )
            const response = await res.json()
            // console.log(response)
            alert(response.message)
            if(response.success){
                setUser(response.data)
                localStorage.setItem("user", JSON.stringify(response.data))
                if(response.data.isVerified){
                    navigate("/dashboard")
                }
                navigate("/verify-email")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return <div className="bg-slate-400 flex items-center justify-center h-screen">
        <Card>
            <CardHeader>
                <CardTitle>New User Registeration</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username *</Label>
                            <Input id="name" placeholder="username" onChange={(e) => {setUsername(e.target.value) }} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Email *</Label>
                            <Input type="email" id="email" placeholder="example@gmail.com" onChange={(e) => {setEmail(e.target.value) }} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Full Name</Label>
                            <Input type="name" id="fullname" placeholder="Full Name" onChange={(e) => {setFullname(e.target.value) }} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Password</Label>
                            <Input type="password" id="password" placeholder="password" onChange={(e) => {setPassword(e.target.value) }} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col space-y-4">
                    <p className="text-xs text-red-600">* Username and Email must be unique</p>
                    <Button onClick={registerRequest} variant="default">Submit</Button>
                </div>
            </CardFooter>
        </Card>
    </div>
}