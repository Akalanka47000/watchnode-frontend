import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { uploadUserTimetable, getUserTimetableList, getTimetable, updateTimetable, deleteTimetable } from '../services/timetable'

export const uploadTimetable = asyncHandler(async (req, res) => {
    const result = await uploadUserTimetable(req.user._id, req.file)
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({
        res,
        data: result,
        message: 'Timetable uploaded succesfully',
    })
})

export const getUserTimetables = asyncHandler(async (req, res) => {
    const result = await getUserTimetableList(req.user._id)
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({
        res,
        data: result,
        message: 'Timetables fetched succesfully',
    })
})

export const getTimetableById = asyncHandler(async (req, res) => {
    const result = await getTimetable(req.user._id, req.params.id)
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({
        res,
        data: result,
        message: 'Timetable fetched succesfully',
    })
})

export const updateTimetableById = asyncHandler(async (req, res) => {
    const result = await updateTimetable(req.user._id, req.params.id, req.body)
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({
        res,
        data: result,
        message: 'Timetable updated succesfully',
    })
})

export const deleteTimetableById = asyncHandler(async (req, res) => {
    const result = await deleteTimetable(req.user._id, req.params.id)
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({
        res,
        data: result,
        message: 'Timetable deleted succesfully',
    })
})
