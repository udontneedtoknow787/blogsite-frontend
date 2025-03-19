import React, { useEffect, useState } from "react";

export const UserContext = React.createContext()

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const localUser = localStorage.getItem("user")
        if (localUser) {
            try { // Use a try-catch block to attempt parsing and handle errors.
                setUser(JSON.parse(localUser));
            } catch (error) { // If an error occurs during parsing, set user to empty object.
                console.error("Error parsing user data from localStorage:", error);
                setUser({});
            }
        }
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}