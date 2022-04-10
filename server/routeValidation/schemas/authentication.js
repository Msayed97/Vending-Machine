import joi from "joi"
import passwordComplixity from "joi-password-complexity"

const complexity_options = {
    min: 5,
    max: 30,
}

export const login = joi.object().
keys({
    username:joi.string().required(),
    password:passwordComplixity(complexity_options).required(),
})
