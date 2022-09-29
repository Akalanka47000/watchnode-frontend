import { useState } from 'react'
import { Modal } from 'flowbite-react'
import { toast } from 'react-toastify'
import { createUser, updateUser } from '../../services/user'
import { Input, Button } from '../common'
import { useEffect } from 'react'

const initialFormData = {
  name: '',
  email: '',
}

const UserModal = ({ user, show, setShow, refresh = () => {} }) => {
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    setFormData(user ? user : initialFormData)
  }, [user])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (user) {
      await updateUser(user._id, {
        name: formData.name,
      }).then((res) => {
        if (res.success) {
          toast.success('User updated successfully')
        }
      })
    } else {
      await createUser(formData).then((res) => {
        if (res.success) {
          toast.success('User added successfully')
          setFormData(initialFormData)
        }
      })
    }
    setShow(false)
    refresh()
  }

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key || e.target.name]: e.target.value,
    })
  }

  return (
    <Modal
      show={show}
      size="2xl"
      onClose={() => {
        setShow(false)
      }}
    >
      <Modal.Header color="white">{user ? 'Update' : 'Add'} User</Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-1 mb-4">
            <Input
              placeholder="User Name"
              name="name"
              value={formData.name}
              className="h-12 sm:h-14 text-black"
              required="true"
              onChange={onChange}
            />
            {!user && (
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                className="h-12 sm:h-14 text-black"
                required="true"
                onChange={onChange}
              />
            )}
            <div className="flex justify-between items-center mt-2">
              <Button value={user ? 'Update' : 'Add'} padding="w-full px-12 py-2 md:py-3" extraClasses="bg-primary-base" type="submit" />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default UserModal
