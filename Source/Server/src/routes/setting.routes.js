import express from 'express'
import { celebrate, Segments } from 'celebrate'
import { getUserSettings, updateUserSettings } from '../controllers/setting'
import { updateSchema } from '../validations/user'

const settingRouter = express.Router()

settingRouter.get('/', getUserSettings)
settingRouter.put('/', celebrate({ [Segments.BODY]: updateSchema }), updateUserSettings)

export default settingRouter
