import Joi from "joi";

export const getVacationValidator = Joi.object({
    vacationId: Joi.string().uuid().required()
})

export const newVacationValidator = Joi.object({
    destination: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().min(1).required()
})

export const newVacationFilesValidator = Joi.object({
    imageFile: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true)
})

export const updateVacationParamsValidator = getVacationValidator;
export const updateVacationValidator = newVacationValidator;

export const updateVacationFilesValidator = Joi.object({
    imageFile: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true).optional()
})

export const deleteVacationValidator = getVacationValidator;