import { Navbar } from "@/components/customcomponents/navbar"
import useUserContext, { UserContext } from "@/context/userContext"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const DashboardPage = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const handleView = (blogID) => {
        navigate(`/blog/u/?blogID=${blogID}`)
    }

    if (!(user && user?._id)) {
        console.log(user)
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
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>ID:</strong> {user._id}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Full Name:</strong> {user.fullname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Joined:</strong> {user.createdAt}</p>
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
                            {user.blogs?.reverse().map((blogId) => (
                                <TableRow key={blogId}>
                                    <TableCell>{blogId}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => {handleView(blogId)}} variant="outline">View</Button>
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