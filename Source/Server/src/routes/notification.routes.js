import express from 'express'
import { idSchema } from '../validations/schedule'
import { getUserNotifications, deleteUserNotification } from '../controllers/notification'

const notificationRouter = express.Router()

notificationRouter.get('/', getUserNotifications)
notificationRouter.delete('/:id', celebrate({ [Segments.PARAMS]: idSchema }), deleteUserNotification)

export default notificationRouter
