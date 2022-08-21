import express from 'express'
import { celebrate, Segments } from 'celebrate'
import { getUserSettings, updateUserSettings } from '../controllers/setting'
import { updateSchema } from '../validations/user'

const userRouter = express.Router()

userRouter.get('/', getUserSettings)
userRouter.put('/', celebrate({ [Segments.BODY]: updateSchema }), updateUserSettings)

export default userRouter
