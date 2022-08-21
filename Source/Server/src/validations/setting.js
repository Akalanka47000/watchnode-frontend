import { Joi } from 'celebrate'

export const updateSchema = {
  lecture_notification_enabled: Joi.boolean().optional(),
  exam_notification_enabled: Joi.boolean().optional(),
  lecture_notification_period: Joi.number().optional(),
  exam_notification_period: Joi.number().optional(),
}
