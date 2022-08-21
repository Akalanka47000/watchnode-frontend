import Setting from '../models/setting'

export const createUserSetting = (data) => {
  return Setting.create(data)
}

export const getUserSetting = (user) => {
  return Setting.findOne({ user })
}

export const updateUserSetting = (user, data) => {
  return Setting.findOneAndUpdate({ user }, data, { new: true })
}
