import { Navbar } from "@/components/customcomponents/navbar"
import useUserContext, { UserContext } from "@/context/userContext"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const DashboardPage = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    const handleView = (blogID) => {
        navigate(`/blog/u/?blogID=${blogID}`)
    }
    const handleDelete = async (blogID) => {
        const API = import.meta.env.VITE_API_BASE_URL
        try {
            const res = await fetch(`${API}/blogs/delete-blog/?blogId=${blogID}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const response = await res.json()
            if (response.success) {
                alert("Blog deleted successfully!")
                // Optionally, you can refresh the user data or redirect
                setUser({...user, blogs: response.data.updatedBlogs})
                localStorage.setItem("user", JSON.stringify({...user, blogs: response.data.updatedBlogs}))
                navigate("/dashboard")
            } else {
                alert("Error deleting blog: " + response.message)
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Error deleting blog: " + error.message);
            return;
        }
    }

    if (!(user && user?._id)) {
        // console.log(user)
        return <div>
            <Navbar />
            <div>
                You are not logged-in!
            </div>
        </div>
    }

    return (<>
        <Navbar />
        <div className="p-6 space-y-6">
            {/* User Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>ID:</strong> {user._id}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Full Name:</strong> {user.fullname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Joined:</strong> {user.createdAt}</p>
                        <p><strong>Change Password : </strong><a className="underline" href="/update-password">Here</a></p>
                    </div>
                </CardContent>
            </Card>

            {/* Blogs Table */}
            <Card>
                <CardHeader>
                    <CardTitle>User Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Blog ID</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.blogs.map((blogId) => (
                                <TableRow key={blogId}>
                                    <TableCell>{blogId}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => {handleView(blogId)}} variant="outline">View</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => {handleDelete(blogId)}} variant="destructive">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        </>
    )
}