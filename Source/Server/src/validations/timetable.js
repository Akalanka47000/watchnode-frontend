import { Joi } from 'celebrate'

export const idSchema = {
    id: Joi.string().hex().length(24).required(),
}

export const updateSchema = {
    events: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        start: Joi.number().required(),
        end: Joi.number().required(),
        day: Joi.number().valid(1, 2, 3, 4, 5, 6, 7).required(),
        location: Joi.string().required(),
    })).required(),
}
