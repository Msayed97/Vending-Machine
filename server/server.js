import express from 'express'
import http from 'http'

const app = express()
const server = http.Server(app)
app.set('server', server)


export default app