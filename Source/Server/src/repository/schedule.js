import Schedule from '../models/schedule'

export const createSchedule = (data) => {
    return Schedule.create(data)
}

export const fetchUserSchedules = (user) => {
    return Schedule.find({ user })
}

export const fetchScheduleById = (id) => {
    return Schedule.findById(id)
}

export const updateScheduleById = (id, data) => {
    return Schedule.findByIdAndUpdate(id, data, { new: true })
}

export const deleteScheduleById = (id) => {
    return Schedule.findByIdAndDelete(id)
}
