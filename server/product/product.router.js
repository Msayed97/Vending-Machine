import  {Router} from "express"
import * as controllers from "./product.controller"
import  {catchAsync} from "../errorHandling/utils"
import  {validator} from "../routeValidation/utils"
import * as productSchemas from "../routeValidation/schemas/product"
import {verifyUser} from "../authentication/authentication.middleware"
import {isUserAuthorized} from "../authorization/authorization.middleware"
import {buyer , seller} from "../authorization/authorization.constants"


const product_router = Router()
product_router.
    route("/").
    post(catchAsync(verifyUser),catchAsync(isUserAuthorized(seller)),catchAsync(validator(productSchemas.create_product,"body")),catchAsync(controllers.createProduct)).
    get(catchAsync(controllers.getProducts))



product_router.
    route("/:id").
    get(catchAsync(controllers.getProduct)).
    patch(catchAsync(verifyUser),catchAsync(isUserAuthorized(seller)),catchAsync(validator(productSchemas.update_product,"body")),catchAsync(controllers.updateProduct)).
    delete(catchAsync(verifyUser),catchAsync(isUserAuthorized(seller)),catchAsync(controllers.deleteProduct))


product_router.
    route("/:id/buy").
    post(catchAsync(verifyUser),catchAsync(isUserAuthorized(buyer)), catchAsync(validator(productSchemas.buy,"body")),catchAsync(controllers.buy))




export default product_router