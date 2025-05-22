import UseTheme from "@/context/themeContext"
import { Button } from "../ui/button"

export const ThemeButton = () => {
    const {theme, lightTheme, darkTheme} = UseTheme()
    const manageTheme = () => {
        if(theme=="dark"){
            localStorage.setItem("theme", "light")
            lightTheme()
        }
        else {
            localStorage.setItem("theme", "dark")
            darkTheme()
        }
    }

    return <Button onClick={manageTheme}>{theme==="dark" ?  <span>&#9728;</span> : <span>&#9788;</span>}</Button>
}