import {verifyToken} from "./authentication.utils"
import {token_types } from "../utils/constants"

export const verifyUser = async (req , res , next) => {
    let access_token = req.headers.authorization
    if(access_token && access_token.startsWith("Bearer "))
        access_token = access_token.split(' ')[1]
    let user_data = await verifyToken(access_token ,token_types.access)
    req.user_data = user_data
    next()
}


