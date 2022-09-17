import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children, title }) => {

  useEffect(() => {
    document.title = title || 'App | Watchnode'
  }, [])

  return (
    <>
      <main className="bg-white text-black font-inter min-h-screen overflow-x-hidden">
        {children}
        <ToastContainer />
      </main>
    </>
  )
}

export default Layout
