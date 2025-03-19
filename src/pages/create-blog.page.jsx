import { MarkDownEditor } from "@/components/customcomponents/markdownEditor"
import { Navbar } from "@/components/customcomponents/navbar"

export const CreateBlogPage = () => {
    
    return <div>
        <Navbar />
        <h1 className="m-4">Create Blog Page</h1>
        <MarkDownEditor />
    </div>
}