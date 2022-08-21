import { createTimetable, deleteTimetableById, fetchTimetableById, fetchUserTimetables, updateTimetableById } from '../repository/timetable'
import tesseract from "node-tesseract-ocr"



export const uploadUserTimetable = async (userId, file) => {
    const config = {
        lang: "eng",
        oem: 1,
        psm: 12,
    }
    await tesseract
        .recognize(file.buffer, config)
        .then((text) => {
            console.log("Result:", text.replace(/(^[ \t]*\n)/gm, ""))
        })
        .catch((error) => {
            console.log(error.message)
        })
    const data = {}
    return true
    return createTimetable({ user: userId, ...data })
}

export const getUserTimetableList = async (userId) => {
    return fetchUserTimetables(userId)
}

export const getTimetable = async (userId, id) => {
    const timetable = await fetchTimetableById(id)
    if (timetable.user !== userId) return { status: 404, message: 'Timetable not found' }
    return timetable
}

export const updateTimetable = async (userId, id, data) => {
    const timetable = await fetchTimetableById(id)
    if (timetable.user !== userId) return { status: 404, message: 'Timetable not found' }
    return updateTimetableById(id, data)
}

export const deleteTimetable = async (userId, id) => {
    const timetable = await fetchTimetableById(id)
    if (timetable.user !== userId) return { status: 404, message: 'Timetable not found' }
    return deleteTimetableById(id)
}