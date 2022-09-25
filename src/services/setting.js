import { axiosInstance, apiRequest } from './core/axios'

export const getUserNotificationSettings = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/settings`))
}

export const updateUserNotificationSettings = async (data) => {
  return await apiRequest(() => axiosInstance.put(`/api/settings`, data))
}

export const getScheduleNotificationSettings = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/settings/${id}`))
}

export const updateScheduleNotificationSettings = async (id, data) => {
  return await apiRequest(() => axiosInstance.put(`/api/settings/${id}`, data))
}
