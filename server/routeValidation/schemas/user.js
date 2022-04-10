import joi, { not } from "joi"
import {user_types} from "../../utils/constants"
import {HTTP400Error } from "../../errorHandling/error.classes"
import passwordComplixity from "joi-password-complexity"
import {allowed_coins } from  "../../utils/constants"
const complexity_options = {
    min: 5,
    max: 30,
}


const validateCoins = async (coins) => {
    let sum = 0
    for (let key of Object.keys(coins)) {
        key = parseInt(key)
        if(!(allowed_coins.includes(key)))
            throw new HTTP400Error(`Machine don't accept coins with value ${key}`)
        sum += coins[key]*key
    }
    return sum
}


export const create_user = joi.object().
keys({

    role:joi.any().valid(...Object.values(user_types)).required(),
    username:joi.string().required(),
    password:passwordComplixity(complexity_options).required(),
})

export const update_user = joi.object().
keys({

    role:joi.any().valid(...Object.values(user_types)),
    username:joi.string(),
    password:passwordComplixity(complexity_options),
    
}).min(1)

export const deposit = joi.object().
keys({
    coins: joi.object().external(validateCoins)
})
