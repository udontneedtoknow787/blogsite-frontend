import LoadingPage from "@/components/customcomponents/loading-page"
import { Navbar } from "@/components/customcomponents/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BlogsPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchBlogs = async (page) => {
        setLoading(true)
        setBlogs([])
        try {
            console.log(API)
            console.log("fetch request sent for page:", page, " limit: 18")
            const res = await fetch(`${API}/blogs/allblogs`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    page: page,
                    limit: 12,
                    sortType: -1,
                }),
            })
            const response = await res.json()
            console.log(response)
            console.log("fetch request completed for page:", page, " limit: 12")
            if(response.success === false && response.statuscode === 405) {
                console.log("No more blogs to show!")
                setLoading(false);
                alert("No more blogs to show!");
                setPage(page-1)
            }
            else if (response.success) {
                setLoading(false)
                setBlogs(response.data)
            }
            else {
                setLoading(false)
                alert("Error fetching blogs: " + response.message)
            }
        } catch (error) {
            setLoading(false)
            alert(error)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBlogs(page)
    }, [page])

    return <>
        <Navbar />
        {loading ? <LoadingPage /> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {blogs.map((blog, index) => (
                <Card key={blog._id} className="rounded-2xl shadow-lg p-4 hover:shadow-xl transition" onClick={() => { navigate(`/blog/u/?blogId=${blog._id}`) }}>
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-sm text-gray-500">By {blog.authorname} - {blog.createdAt}</p>
                        {/* <p className="mt-2 text-gray-700 line-clamp-3"><Markdown>{blog.content}</Markdown></p> */}
                    </CardContent>
                </Card>
            ))}
        </div>
        {/* {Blog pagination} */}
        <div>
            <div className="flex justify-center p-2">
                {
                    page > 1 ? <div className="m-2 p-2"><a href="#navbar"><Button onClick={() => { setLoading(!loading); setPage(page - 1) }} >Previous Page</Button></a></div> : null
                }
                <div className="m-2 p-2"><a href="#navbar"><Button onClick={() => { setLoading(!loading); setPage(page + 1) }} >Next Page</Button></a></div>
            </div>
        </div>
    </>
}