"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"

export const SearchButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Search</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <a href="/blog/u/?blogId=" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                        search(by Blog-ID)
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a href="/profile/username" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                        search(by username)
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}