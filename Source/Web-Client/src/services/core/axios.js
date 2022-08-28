import axios from 'axios'
import toast from '../../libs/toastify'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const apiRequest = async (request) => {
  return await request()
    .then((res) => res.data)
    .catch((error) => {
      toast.convertAndNotifyError(error)
      return null
    })
}
