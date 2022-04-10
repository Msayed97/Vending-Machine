import  {Router} from "express"
import * as controllers from "./authentication.controller"
import  {catchAsync} from "../errorHandling/utils"
import  {validator} from "../routeValidation/utils"
import * as authenticationSchemas from "../routeValidation/schemas/authentication"

const auth_router = Router()
auth_router.
    route("/login").
    post(catchAsync(validator(authenticationSchemas.login,"body")),catchAsync(controllers.login))


auth_router.
    route("/refresh").
    get(catchAsync(controllers.refresh))


export default auth_router