import { axiosInstance, apiRequest } from './core/axios'

export const getAllNotifications = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/notifications?${filterQuery}&${sortQuery}`))
}
