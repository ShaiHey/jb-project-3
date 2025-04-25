import Joi from "joi";

export const addLikeValidator = Joi.object({
    vacationId: Joi.string().uuid().required()
})

export const removeLikeValidator = addLikeValidator;