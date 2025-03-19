import { Navbar } from "@/components/customcomponents/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const PublicProfile = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const [user, setUser] = useState({})
    const location = useLocation()
    const navigate =useNavigate()
    const [username, setUsername] = useState(location.pathname.split("/")[2])

    const fetchDetails = async () => {
        try {
            const res = await fetch(`${API}/users/profile/${username}`)
            const response = await res.json()
            console.log(response)
            if ("Response = ", response.success) {
                setUser(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // console.log(location.pathname.split("/"))
        // setUsername(location.pathname.split("/")[2])
        fetchDetails()
    }, [username])

    return <>
        <Navbar />
        <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Public Profile:</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-2xl font-bold mb-2">{user.fullname}</h2>
                <p className="text-gray-500 text-sm">@{user.username}</p>
                <p className="text-gray-400 text-xs">User ID: {user._id}</p>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Blogs</h3>
                    {user?.blogs?.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                            {user?.blogs?.slice().reverse().map((blog, index) => (
                                <li key={index} className="text-gray-700"><Button variant="link" onClick={() => navigate(`/blog/u/?blogId=${blog}`)}>{blog}</Button></li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No blogs available.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    </>
}