import joi from "joi"

export const create_product = joi.object().
keys({
    name:joi.string().required(),
    amount:joi.number().required().positive(),
    cost:joi.number().required().positive(),
})

export const update_product = joi.object().
keys({
    name:joi.string(),
    amount:joi.number().positive(),
    cost:joi.number().positive(),
}).min(1)

export const buy = joi.object().
keys({
    amount:joi.number().positive().required()
})
