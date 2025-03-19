import React from "react"


export const ThemeContext = React.createContext({
    theme: "dark",
    lightTheme: () => {},
    darkTheme: () => {}
})

export const ThemeContextProvider = ThemeContext.Provider

export default function UseTheme(){
    return React.useContext(ThemeContext)
}