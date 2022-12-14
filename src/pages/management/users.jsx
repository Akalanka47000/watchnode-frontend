import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Tooltip } from 'flowbite-react'
import { startCase } from 'lodash'
import { useState } from 'react'
import { CSVLink } from 'react-csv'
import Swal from 'sweetalert2'
import { TiUserDelete } from 'react-icons/ti'
import { AiTwotoneEdit, AiOutlineDownload } from 'react-icons/ai'
import { Button, Filters, Sorts } from '../../components/common'
import { Footer, Header, Layout } from '../../components/layout'
import UserModal from '../../components/users/userModal'
import { userFilters, userSorts } from '../../filters/user'
import { deleteUser, getAllUsers } from '../../services/user'

const UserManagement = () => {
  const [userData, setUserData] = useState(null)

  const [showUserModal, setShowUserModal] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('')

  const [user, setUser] = useState(null)

  const refresh = () => {
    getAllUsers(filterQuery, sortQuery).then((res) => {
      setUserData(res.data)
    })
  }

  useEffect(() => {
    refresh()
  }, [filterQuery, sortQuery])

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
      <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col justify-center items-center relative pt-10">
        <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
          <Filters filters={userFilters} setFilterQuery={setFilterQuery} />
          <Sorts sorts={userSorts} setSortQuery={setSortQuery} />
        </div>
        <div className="w-10/12 flex justify-end items-center mt-8 mb-8">
          <Tooltip content="Download as CSV">
            <CSVLink
              headers={[
                { label: 'ID', key: '_id' },
                { label: 'Name', key: 'name' },
                { label: 'Email', key: 'email' },
                { label: 'Role', key: 'role' },
                { label: 'Created Date', key: 'created_at' },
                { label: 'Updated Date', key: 'updated_at' },
              ]}
              data={userData || []}
              filename={'[Watchnode] - All Users.csv'}
            >
              <Button
                value={<AiOutlineDownload className="w-8 h-8"></AiOutlineDownload>}
                padding="px-2 py-1 md:py-2"
                extraClasses="w-20 bg-primary-base flex place-content-center mr-5"
              />
            </CSVLink>
          </Tooltip>
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
                  <div className="w-full flex flex-col lg:flex-row gap-y-2 justify-start items-start">
                    <span className="w-full lg:w-2/12 text-white text-sm md:text-md font-semibold">Name: {user.name}</span>
                    <span className="w-full lg:w-3/12 text-white text-sm md:text-md font-semibold">Email: {user.email}</span>
                    <span className="w-full lg:w-3/12 text-white text-sm md:text-md font-semibold">Role: {startCase(user.role)}</span>
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
