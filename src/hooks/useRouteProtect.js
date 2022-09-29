import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const useRouteProtect = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const openRoutes = ['/login', '/register']

  const adminProtectedRoutes = ['/dashboard', '/user-management']

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!openRoutes.includes(location.pathname) && !localStorage.getItem('token')) {
      navigate('/login')
    } else if (!isEmpty(user) && adminProtectedRoutes.includes(location.pathname) && user.role !== 'ADMIN') {
      navigate('/')
    }
  }, [location])
}

export default useRouteProtect
