import { Link, useNavigate } from 'react-router-dom'
import { LogoutIcon, SupportIcon } from '@heroicons/react/solid'

const Header = () => {
  const navigateTo = useNavigate()

  const logoutUser = async () => {
    localStorage.clear()
    sessionStorage.clear()
    navigateTo('/login')
  }

  return (
    <header className="w-full h-20 absolute z-50 p-5 flex justify-between items-center bg-white/10 backdrop-blur shadow-xl shadow-gray-500/10">
      <h2 className="text-2xl text-center font-bold text-white pb-2 cursor-default">Watchnode</h2>
      <div className="flex justify-evenly align-items-center">
        <Link
          to="/settings"
          className="p-2 ml-4 text-white bg-primary-base hover:bg-primary-hover outline-none rounded-md transition duration-300 shadow-sm"
        >
          <SupportIcon className="w-6 h-6" />
        </Link>
        <button
          onClick={logoutUser}
          className="p-2 ml-4 text-white bg-primary-base hover:bg-primary-hover outline-none rounded-md transition duration-300 shadow-sm"
        >
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}

export default Header
