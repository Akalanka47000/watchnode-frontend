import { axiosInstance, apiRequest } from './core/axios'

export const getLatestSchedule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/schedules?limit=1`))
}

export const addSchedule = async (file) => {
  return await apiRequest(() => {
    const formData = new FormData()
    formData.append('schedule', file)
    return axiosInstance.post(`/api/schedules`, formData)
  })
}
