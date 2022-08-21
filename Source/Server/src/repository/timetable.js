import Timetable from '../models/timetable'

export const createTimetable = (data) => {
    return Timetable.create(data)
}

export const fetchUserTimetables = (user) => {
    return Timetable.find({ user })
}

export const fetchTimetableById = (id) => {
    return Timetable.findById(id)
}

export const updateTimetableById = (id, data) => {
    return Timetable.findByIdAndUpdate(id, data, { new: true })
}

export const deleteTimetableById = (id) => {
    return Timetable.findByIdAndDelete(id)
}
