import { useContext, useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useNavigate } from "react-router-dom"
import { MarkdownInfoComponent } from "./markdown-info-table"
import remarkMath from "remark-math"
import rehypeRaw from "rehype-raw"
import 'katex/dist/katex.min.css';
import rehypeKatex from "rehype-katex"
import { UserContext } from "@/context/userContext"


export const MarkDownEditor = () => {
    const API = import.meta.env.VITE_API_BASE_URL
    const {user, setUser} = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [markdown, setMarkdown] = useState('# Hi, *Pluto*!')
    const navigate = useNavigate()

    const handleUpload = async () => {
        try {
            const res = await fetch(`${API}/blogs/post-blog`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        content: markdown
                    }),
                },
            )
            const response = await res.json()
            console.log(response)
            alert(response.message)
            if (response.success) {
                setUser(response.data.user)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate(`/blog/u/?blogid=${response.data.blog._id}`, { state: { blog: response.data.blog } })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return <div>
        <div className="p-2">
            <Label className={"text-xl font-bold mb-3"} htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" onChange={(e) => { setTitle(e.target.value) }} />

            <h1 className="text-xl font-bold mb-3">Markdown Editor</h1>
            <Textarea
                className="w-full h-40 border p-2"
                placeholder="Write Markdown here..."
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            />
        </div>
        <Button onClick={handleUpload}>SUBMIT</Button>
        <MarkdownInfoComponent />
        <div className="border p-3 mt-2 markdown-body">
            <h1 className="text-xl font-bold mb-3">Markdown Preview:</h1>
            <Markdown
            rehypePlugins={[remarkGfm, rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkMath]}
            components={{
                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-md h-auto m-auto rounded-lg shadow-md" // Tailwind classes for styling
                    />
                ),
                pre: ({children}) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto">{children}</pre>
                ),
                code: ({children}) => (
                    <code className="font-mono text-sm dark:text-black">{children}</code>
                )
            }}>{markdown}</Markdown>
        </div>
    </div>
}

export const EditorForMarkdown = ({children}) => {
    return (
        <div className="border p-3 mt-2 markdown-body">
            <h1 className="text-xl font-bold mb-3">Markdown Preview:</h1>
            <Markdown
            rehypePlugins={[remarkGfm, rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkMath]}
            components={{
                img: ({ src, alt }) => (
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-md h-auto rounded-lg shadow-md" // Tailwind classes for styling
                    />
                ),
                pre: ({children}) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto">{children}</pre>
                ),
                code: ({children}) => (
                    <code className="font-mono text-sm dark:text-black">{children}</code>
                )
            }}>{children}</Markdown>
        </div>
    )
}