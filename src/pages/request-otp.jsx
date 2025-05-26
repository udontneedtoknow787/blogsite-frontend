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


export const RequestOTPPage = () => {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_BASE_URL
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")


    const requestOtp = async () => {
        // console.log(`username:${username}, password:${password}`)
        try {
            const res = await fetch(`${API}/users/request-otp`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email
                    }),
                },
            )
            const response = await res.json()
            // console.log(response)
            alert(response.message)
            if(response.success){
                navigate("/verify-email")
            }
        } catch (error) {
            alert("An error occurred while requesting OTP. Please try again after sometime.")
            console.error(error)
            navigate("/")
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
                            <Input id="name" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
            <Button onClick={requestOtp} variant="default">Submit</Button>
            </CardFooter>
        </Card>
    </div>
}