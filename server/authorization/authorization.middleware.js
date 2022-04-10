import {HTTP403Error} from "../errorHandling/error.classes"

export const isUserAuthorized = (user_types)=> async (req , res , next) => {
    if(!(user_types.includes(req.user_data.role)))
        throw new HTTP403Error("User is not allowed to do this action.")
    next()
}


