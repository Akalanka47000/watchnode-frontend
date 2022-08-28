import { axiosInstance, apiRequest } from './core/axios'

export const login = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/login`, data))
}

export const register = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/register`, data))
}

export const logout = async () => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/logout`))
}
