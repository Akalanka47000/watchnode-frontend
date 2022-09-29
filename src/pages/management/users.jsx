import { Tooltip } from 'flowbite-react'
import { startCase } from 'lodash'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { TiUserDelete } from 'react-icons/ti'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Button } from '../../components/common'
import { Footer, Header, Layout } from '../../components/layout'
import useEffectOnce from '../../hooks/useEffectOnce'
import { deleteUser, getAllUsers } from '../../services/user'
import UserModal from '../../components/users/userModal'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const UserManagement = () => {
  const [userData, setUserData] = useState(null)

  const [showUserModal, setShowUserModal] = useState(false)

  const [user, setUser] = useState(null)

  const refresh = () => {
    getAllUsers().then((res) => {
      setUserData(res.data)
    })
  }

  useEffectOnce(() => {
    refresh()
  })

  useEffect(() => {
    user && setShowUserModal(true)
  }, [user])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4800ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id).then(() => {
          toast.success('User Deleted Successfully')
          refresh()
        })
      }
    })
  }

  return (
    <Layout title="User Management | Watchnode">
      <Header />
      <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col justify-center items-center relative pt-28">
        <div className="w-10/12 flex justify-end items-center mt-8 mb-8">
          <Button
            value="Add User"
            padding="w-1/2 lg:w-3/12 px-12 py-2 md:py-3"
            extraClasses="bg-primary-base"
            onClick={() => {
              setShowUserModal(true)
            }}
          />
        </div>
        {userData && (
          <div className="w-full flex flex-col justify-center items-center gap-y-6">
            {userData.map((user, index) => {
              return (
                <div key={`${user._id}-user-management`} className="w-10/12 flex justify-between items-center bg-white/5 rounded-md p-8 relative">
                  <div className="flex flex-col gap-y-2 justify-center items-start">
                    <span className="text-white text-sm md:text-md font-semibold">Name: {user.name}</span>
                    <span className="text-white text-sm md:text-md font-semibold">Email: {user.email}</span>
                    <span className="text-white text-sm md:text-md font-semibold">Role: {startCase(user.role)}</span>
                  </div>
                  <div className="h-full flex justify-center items-center absolute right-0 top-0 rounded-r-md">
                    <div
                      className="h-full flex justify-center items-center px-2 lg:px-8 bg-primary-base hover:bg-primary-hover rounded-r-md cursor-pointer transition-all duration-300"
                      onClick={() => {
                        setUser(user)
                      }}
                    >
                      <Tooltip content="Remove User">
                        <AiTwotoneEdit className="text-white w-8 h-8" />
                      </Tooltip>
                    </div>
                    <div
                      className="h-full flex justify-center items-center px-2 lg:px-8 bg-red-500 hover:bg-red-600 rounded-r-md cursor-pointer transition-all duration-300"
                      onClick={() => {
                        handleDelete(user._id)
                      }}
                    >
                      <Tooltip content="Remove User">
                        <TiUserDelete className="text-white w-8 h-8" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {!userData?.length && (
          <div className="w-10/12 flex justify-center items-center bg-white/5 rounded-md p-8">
            <span className="text-white text-md font-semibold">No Users Found</span>
          </div>
        )}
      </div>
      <UserModal user={user} show={showUserModal} setShow={setShowUserModal} refresh={refresh} />
      <Footer />
    </Layout>
  )
}

export default UserManagement
