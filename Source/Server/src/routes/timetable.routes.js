import express from 'express'
import { celebrate, Segments } from 'celebrate'
import multer from 'multer'
import { idSchema, updateSchema } from '../validations/timetable'
import { uploadTimetable, getUserTimetables, getTimetableById, deleteTimetableById, updateTimetableById } from '../controllers/timetable'

const upload = multer()

const timetableRouter = express.Router()

timetableRouter.post('/', upload.single('timetable'), uploadTimetable)
timetableRouter.get('/', getUserTimetables)
timetableRouter.get('/:id', celebrate({ [Segments.BODY]: idSchema }), getTimetableById)
timetableRouter.put('/:id', celebrate({ [Segments.BODY]: updateSchema }), updateTimetableById)
timetableRouter.delete('/:id', celebrate({ [Segments.BODY]: idSchema }), deleteTimetableById)

export default timetableRouter
