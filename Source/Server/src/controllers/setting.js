import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { getSetting, updateSetting } from '../services/setting'

export const getUserSettings = asyncHandler(async (req, res) => {
  const setting = await getSetting(req.user._id)
  return makeResponse({
    res,
    data: setting,
    message: 'Settings retrieved succesfully',
  })
})

export const updateUserSettings = asyncHandler(async (req, res) => {
  const setting = await updateSetting(req.user._id, req.body)
  if (setting.status) return makeResponse({ res, ...setting })
  return makeResponse({
    res,
    data: setting,
    message: 'Settings updated succesfully',
  })
})
