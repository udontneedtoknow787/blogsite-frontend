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


export const UpdatePasswordPage = () => {
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_BASE_URL
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")


    const updateRequest = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        try {
            const res = await fetch(`${API}/users/update-password`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newPassword: password
                    }),
                },
            )
            const response = await res.json()
            // console.log(response)
            alert(response.message)
            if(response.success){
                navigate("/dashboard")
            }
        } catch (error) {
            alert("Something went wrong : ", error)
            console.error(error)
        }
    }


    return <div className="bg-slate-400 flex items-center justify-center h-screen">
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <Input id="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="consfirmPassword">Confirm New Password</Label>
                            <Input type="password" id="confirmPassword" placeholder="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
            <Button onClick={updateRequest} variant="default">Submit</Button>
            </CardFooter>
        </Card>
    </div>
}