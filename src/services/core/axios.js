import axios from 'axios'
import toastify from '../../libs/toastify'
import store from '../../store'
import { toggleLoader } from '../../store/ui'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export const apiRequest = async (request) => {
  store.dispatch(toggleLoader(true))
  const response = await request()
    .then((res) => res.data)
    .catch((error) => {
      if (error.response?.status === 403) {
        if (localStorage.getItem('token')) {
          toastify.convertAndNotifyError(error)
        }
      } else {
        toastify.convertAndNotifyError(error)
      }
      return null
    })
  store.dispatch(toggleLoader(false))
  return response
}
