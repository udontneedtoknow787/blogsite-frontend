import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/login.page'
import { DashboardPage } from './pages/dashboard.page'
import { CreateBlogPage } from './pages/create-blog.page'
import { RegisterPage } from './pages/register.page'
import { BlogsPage } from './pages/blogs.page'
import { UniqueBlogPage } from './pages/Individualblog.page'
import { PublicProfile } from './pages/profiles.page'
import LandingPage from './pages/landing.page'
import { ThemeContextProvider } from './context/themeContext'
import { useEffect, useState } from 'react'
import UserContextProvider from './context/userContext'
import { EmailVerificationPage } from './pages/email-verification'

function App() {
  const [theme, setTheme] = useState("dark")
  const lightTheme = () => {setTheme("light")}
  const darkTheme = () => {setTheme("dark")}
  // classic js used to change theme
  useEffect(()=>{
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(theme)
  },[theme])

  return (
    <>
      <ThemeContextProvider value={{theme, lightTheme, darkTheme}} >
      <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/profile/username' element={<PublicProfile />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/blogs' element={<BlogsPage />} />
          <Route path='/blog/u' element={<UniqueBlogPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/editor' element={<CreateBlogPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
      </ThemeContextProvider>
    </>
  )
}

export default App
