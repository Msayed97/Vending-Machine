import  {Router} from "express"
import * as controllers from "./user.controller"
import  {catchAsync} from "../errorHandling/utils"
import  {validator} from "../routeValidation/utils"
import * as userSchemas from "../routeValidation/schemas/user"
import {verifyUser} from "../authentication/authentication.middleware"
import {isUserAuthorized} from "../authorization/authorization.middleware"
import {buyer} from "../authorization/authorization.constants"

const user_router = Router()
user_router.
    route("/").
    post(catchAsync(validator(userSchemas.create_user,"body")),catchAsync(controllers.createUser)).
    get(catchAsync(verifyUser), catchAsync(controllers.getUser)).
    patch(catchAsync(verifyUser), catchAsync(validator(userSchemas.update_user,"body")),catchAsync(controllers.updateUser)).
    delete(catchAsync(verifyUser), catchAsync(controllers.deleteUser))


user_router.
    route("/deposit").
    post(catchAsync(verifyUser),catchAsync(isUserAuthorized(buyer)) , catchAsync(validator(userSchemas.deposit,"body")),catchAsync(controllers.deposit))

user_router.
    route("/reset").
    post(catchAsync(verifyUser),catchAsync(isUserAuthorized(buyer)) , catchAsync(controllers.reset))


export default user_router