import { getUserSetting, updateUserSetting } from '../repository/setting'

export const getSetting = async (userId) => {
  return getUserSetting(userId)
}

export const updateSetting = async (userId, data) => {
  return updateUserSetting(userId, data)
}
