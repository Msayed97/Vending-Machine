import express from 'express'

import user_route from './user/user.router'
import product_router from './product/product.router'
import auth_router from './authentication/authentication.router'
import errorHandlers from './errorHandling/error.controller'
import app from './server'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user' , user_route)
app.use('/api/product' , product_router)
app.use('/api/' , auth_router)

app.use(errorHandlers.errorHandler)
app.use(errorHandlers.wrongPath)

export default app