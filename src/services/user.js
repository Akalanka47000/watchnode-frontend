import { axiosInstance, apiRequest } from './core/axios'

export const getAllUsers = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/users?${filterQuery}&${sortQuery}`))
}
