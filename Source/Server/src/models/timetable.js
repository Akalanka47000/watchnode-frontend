import mongoose from 'mongoose'

const TimetableSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        events: [
            {
                name: {
                    type: String,
                    required: true,
                },
                start: {
                    type: Number,
                    required: true,
                },
                end: {
                    type: Number,
                    required: true,
                },
                day: {
                    type: Number,
                    required: true,
                    validate: {
                        validator: Number.isInteger,
                        message: '{VALUE} is not an integer',
                    },
                },
                location: {
                    type: String,
                    required: true,
                },
            }
        ],
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
)

TimetableSchema.index({ createdAt: 1 })

const Timetable = mongoose.model('Timetable', TimetableSchema)

Timetable.syncIndexes()

export default Timetable
