import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import Settings from '../pages/settings'
import Dashboard from '../pages/dashboard'
import useRouteProtect from '../hooks/useRouteProtect'

const Router = () => {
  useRouteProtect()

  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings/" element={<Settings />} />
      <Route path="/settings/:schedule_id" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default Router
