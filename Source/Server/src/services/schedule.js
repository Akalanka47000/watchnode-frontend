import { createSchedule, deleteScheduleById, fetchScheduleById, fetchUserSchedules, updateScheduleById } from '../repository/schedule'
import tesseract from "node-tesseract-ocr"
import { createUserSetting } from '../repository/setting'

export const uploadUserSchedule = async (userId, file) => {
    const config = {
        lang: "eng",
        oem: 2,
        psm: 6,
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
    const schedule = await createSchedule({ user: userId, ...data })
    createUserSetting({
        schedule: schedule._id
    })
    return schedule
}

export const getUserScheduleList = async (userId, limit) => {
    return fetchUserSchedules(userId, limit)
}

export const getSchedule = async (userId, id) => {
    const schedule = await fetchScheduleById(id)
    if (schedule.user !== userId) return { status: 404, message: 'Schedule not found' }
    return schedule
}

export const updateSchedule = async (userId, id, data) => {
    const schedule = await fetchScheduleById(id)
    if (schedule.user !== userId) return { status: 404, message: 'Schedule not found' }
    return updateScheduleById(id, data)
}

export const deleteSchedule = async (userId, id) => {
    const schedule = await fetchScheduleById(id)
    if (schedule.user !== userId) return { status: 404, message: 'Schedule not found' }
    return deleteScheduleById(id)
}