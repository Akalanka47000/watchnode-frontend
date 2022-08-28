import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useRouteProtect = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const openRoutes = ['/login', '/register']

  useEffect(() => {
    if (!openRoutes.includes(location.pathname) && !localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [location])
}

export default useRouteProtect
