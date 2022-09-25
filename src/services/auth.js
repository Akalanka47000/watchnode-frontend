import { axiosInstance, apiRequest } from './core/axios'

export const login = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/login`, data))
}

export const register = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/register`, data))
}

export const getCurrentUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/auth/current`))
}

export const resetPassword = async (verificationCode, password) => {
  return await apiRequest(() =>
    axiosInstance.post(`/api/auth/reset_password/${verificationCode}`, {
      new_password: password,
    }),
  )
}
