import express from 'express'
import authRouter from './auth.routes'
import userRouter from './user.routes'
import settingRouter from './setting.routes'
import timetableRouter from './timetable.routes'
import { protect } from '../middleware/auth'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', protect, userRouter)
router.use('/settings', protect, settingRouter)
router.use('/timetables', protect, timetableRouter)

export default router
