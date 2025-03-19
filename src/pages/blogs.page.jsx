import { Navbar } from "@/components/customcomponents/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import { useNavigate } from "react-router-dom"

export const BlogsPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const fetchBlogs = async (page) => {
        try {
            console.log(API)
            const res = await fetch(`${API}/blogs/allblogs`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    page: page,
                    limit: 10
                }),
            })
            const response = await res.json()
            console.log(response)
            if (response.success) setBlogs(response.data)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBlogs()
    }, [page])

    return <>
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {blogs.map((blog, index) => (
                <Card key={blog._id} className="rounded-2xl shadow-lg p-4 hover:shadow-xl transition" onClick={() => {navigate(`/blog/u/?blogId=${blog._id}`)}}>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-sm text-gray-500">By {blog.authorname} - {blog.createdAt}</p>
                        {/* <p className="mt-2 text-gray-700 line-clamp-3"><Markdown>{blog.content}</Markdown></p> */}
                    </CardContent>
                </Card>
            ))}
        </div>
    </>
}