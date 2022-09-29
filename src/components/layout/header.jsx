import { Link, useNavigate } from 'react-router-dom'
import { LogoutIcon, SupportIcon, HomeIcon } from '@heroicons/react/solid'
import { RiDashboardFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Tooltip } from 'flowbite-react'

const Header = () => {
  const navigateTo = useNavigate()

  const user = useSelector((state) => state.user)

  const logoutUser = async () => {
    localStorage.clear()
    sessionStorage.clear()
    navigateTo('/login')
  }

  const navLinks = [
    {
      path: '/',
      icon: HomeIcon,
      name: 'Home',
      show: true,
    },
    {
      path: '/settings',
      icon: SupportIcon,
      name: 'Settings',
      show: true,
    },
    {
      path: '/dashboard',
      icon: RiDashboardFill,
      name: 'Dashboard',
      show: user?.role === 'ADMIN',
    },
  ]

  return (
    <header className="w-full h-20 absolute z-50 p-5 flex justify-between items-center bg-white/10 backdrop-blur shadow-xl shadow-gray-500/10">
      <h2 className="text-2xl text-center font-bold text-white pb-2 cursor-default">Watchnode</h2>
      <div className="flex justify-evenly items-center">
        {navLinks.map((link, index) => {
          return (
            link.show && (
              <Link
                to={link.path}
                className="p-2 ml-4 text-white bg-primary-base hover:bg-primary-hover outline-none rounded-md transition duration-300 shadow-sm"
              >
                <Tooltip content={link.name} key={`${link.path}-${index}`}>
                  <link.icon className="w-6 h-6" />
                </Tooltip>
              </Link>
            )
          )
        })}
        <Tooltip content="Logout">
          <button
            onClick={logoutUser}
            className="p-2 ml-4 text-white bg-primary-base hover:bg-primary-hover outline-none rounded-md transition duration-300 shadow-sm"
          >
            <LogoutIcon className="w-6 h-6" />
          </button>
        </Tooltip>
      </div>
    </header>
  )
}

export default Header
