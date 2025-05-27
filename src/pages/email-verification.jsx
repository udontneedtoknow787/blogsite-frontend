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

export const EmailVerificationPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const { user, setUser } = useContext(UserContext)
    const [userId, setUserId] = useState(user?._id || "")
    const [otp, setOtp] = useState("")
    const [waiting, setWaiting] = useState(false)
    const navigate = useNavigate()

    const verifyRequest = async () => {
        // console.log(`userId:${userId}, OTP:${otp}`)
        if (!userId || !otp) {
            alert("Please fill in all fields")
            return
        }
        if (waiting) {
            alert("Please wait for the previous request to complete")
            return
        }
        setWaiting(true)
        try {
            const res = await fetch(`${API}/users/verify`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: userId,
                        otp: otp,
                    }),
                },
            )
            const response = await res.json()
            setWaiting(false)
            // console.log(response)
            alert(response.message)
            if (response.success) {
                setUser(response.data.user)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/dashboard")
            }
        } catch (error) {
            setWaiting(false)
            console.error(error)
        }
    }

    return <div className="bg-slate-400 flex items-center justify-center h-screen">
        <Card>
            <CardHeader>
                <CardTitle>Email Verification</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">UserId *</Label>
                            <Input id="name" value={userId} placeholder="username" onChange={(e) => { setUserId(e.target.value) }} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework"> OTP </Label>
                            <Input type="password" id="password" placeholder="password" onChange={(e) => { setOtp(e.target.value) }} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col space-y-4">
                    <p className="text-xs text-red-600">* your OTP will be expired in 10 minutes.</p>
                    <Button onClick={verifyRequest} variant="default">Submit</Button>
                    {waiting && <MiniLoadingIcon />}
                </div>
            </CardFooter>
        </Card>
    </div>
}