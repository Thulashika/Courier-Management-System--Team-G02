import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import { AuthProvider } from './views/pages/register/AuthProvider'
import Home from './views/home/Home'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Landingpage = React.lazy(() => import('./views/landingpage/Landingpage'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Resetpassword = React.lazy(() => import('./views/pages/login/Resetpassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Profile = React.lazy(() => import('./views/pages/register/Profile'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthProvider>
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/landingPage" name="Home Page" element={<Landingpage />} />
          <Route exact path="/home" name="Home Page" element={<Home />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />          
          <Route exact path="/reset-password" name="Reset Password" element={<Resetpassword />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/profile" name="Profile" element={<Profile />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </Router>
    </AuthProvider>
  )
}

export default App
