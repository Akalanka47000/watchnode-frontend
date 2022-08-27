import express from 'express'
import { celebrate, Segments } from 'celebrate'
import multer from 'multer'
import { idSchema, updateSchema } from '../validations/schedule'
import * as settingValidator from '../validations/setting'
import { uploadSchedule, getUserSchedules, getScheduleById, deleteScheduleById, updateScheduleById, updateScheduleSettingsById } from '../controllers/schedule'

const upload = multer()

const scheduleRouter = express.Router()

scheduleRouter.post('/', upload.single('schedule'), uploadSchedule)
scheduleRouter.get('/', getUserSchedules)
scheduleRouter.get('/:id', celebrate({ [Segments.BODY]: idSchema }), getScheduleById)
scheduleRouter.put('/:id', celebrate({ [Segments.BODY]: updateSchema }), updateScheduleById)
scheduleRouter.put('/:id/settings', celebrate({ [Segments.BODY]: settingValidator.updateSchema }), updateScheduleSettingsById)
scheduleRouter.delete('/:id', celebrate({ [Segments.BODY]: idSchema }), deleteScheduleById)

export default scheduleRouter
