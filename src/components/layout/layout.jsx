import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import useEffectOnce from '../../hooks/useEffectOnce'
import { getCurrentUser } from '../../services/auth'
import { setUser } from '../../store/user'
import Loader from '../common/loader'

const Layout = ({ children, title }) => {
  useEffect(() => {
    document.title = title || 'App | Watchnode'
  }, [])

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffectOnce(() => {
    localStorage.getItem('token') &&
      isEmpty(user) &&
      getCurrentUser().then((res) => {
        dispatch(setUser(res.data))
      })
  })

  return (
    <>
      <main className="bg-white text-black font-inter min-h-screen overflow-x-hidden">
        {children}
        <Loader />
        <ToastContainer />
      </main>
    </>
  )
}

export default Layout
