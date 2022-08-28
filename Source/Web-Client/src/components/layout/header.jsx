import { useNavigate } from 'react-router-dom'
import { Button } from '../common'
import { logout } from '../../services/auth'

const Header = () => {
  const navigateTo = useNavigate()

  const logoutUser = async () => {
    const res = await logout()
    if (res.status === 200) {
      localStorage.clear()
      sessionStorage.clear()
      navigateTo('/login')
    }
  }

  return (
    <header className="w-full h-20 absolute z-50 p-5 flex justify-between items-center bg-white/50 backdrop-blur shadow-xl shadow-gray-500/10">
      <h2 className="text-4xl text-center font-bold text-slate-900 pb-2 cursor-default">TODO</h2>
      <Button value="Logout" width="" padding="px-12 py-3" onClick={logoutUser} />
    </header>
  )
}

export default Header
