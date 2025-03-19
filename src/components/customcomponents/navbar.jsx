import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"
import { LogoutButton } from "./logoutbutton"
import { useState } from "react";
import { ThemeButton } from "./themebtn";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    return <>
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                        <span onClick={() => navigate("/")}>BlogSite</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <a href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            Home
                        </a>
                        <a href="/blogs" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            Blogs
                        </a>
                        <a href="/editor" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            Create
                        </a>
                        <a href="/blog/u/?blogId=" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            search(by ID)
                        </a>
                        <LogoutButton />
                        <ThemeButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        className="md:hidden text-gray-700 dark:text-gray-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="space-y-2 px-4 pb-4">
                    <a href="/dashboard" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                        Home
                    </a>
                    <a href="/blogs" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                        Blogs
                    </a>
                    <a href="/login" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                        Login
                    </a>
                    <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
                        Landing Page
                    </a>
                    <ThemeButton />
                </div>
            </div>
        </nav>
    </>
}