import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/customcomponents/navbar"
import { EditorForMarkdown } from "@/components/customcomponents/markdownEditor"

export const UniqueBlogPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const [blog, setBlog] = useState({})
    const location = useLocation()

    const fetchBlog = async () => {
        // console.log("fetch request sent")
        const res = await fetch(`${API}/blogs/?blogId=${location.search.split("=")[1]}`,)
        const response = await res.json()
        // console.log("Response = ",response)
        if (!response.success) {
            alert(response.message)
        }
        else{
            setBlog(response.data)
            location.state = {blog: response.data}
        } 
    }

    useEffect(() => {
        // console.log("location=", location)
        if (location.state?.blog) {
            setBlog(location.state.blog)
            return
        }
        else {
            fetchBlog()
        }
        
    }, [])

    // remember to remove this dark and manage it through dark button mode
    return (<div className="min-h-screen min-w-full">
        <Navbar />     
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-10">
            <Card className="max-w-3xl w-full shadow-lg rounded-2xl">
                <CardContent className="p-6 sm:p-10">
                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                        {blog.title || "Untitled Blog Post"}
                    </h1>

                    {/* Author and Date */}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>By {blog.authorname || "Anonymous"}</span>
                        <span>{blog.createdAt || "20XX"}</span>
                    </div>

                    {/* Divider */}
                    <hr className="my-6 border-gray-300 dark:border-gray-700" />

                    {/* Content */}
                    {/* <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="border p-3 mt-2 markdown-body">
                            <Markdown rehypePlugins={[remarkGfm]}>{blog.content}</Markdown>
                        </div>
                    </div> */}
                    <EditorForMarkdown>
                        {blog.content}
                    </EditorForMarkdown>

                    {/* CTA Button */}
                    <div className="mt-6 flex justify-end">
                        <Button variant="outline">Share Blog</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>)
}