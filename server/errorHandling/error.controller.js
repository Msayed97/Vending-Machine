const errorHandlers = {}
import {env} from '../utils/constants'

errorHandlers.wrongPath =  (req, res) => {
    res.status(404).send('404 not found')        
}

const sendErrorDev = (err, res) => {
    res.status(err.status_code).json({
    message: err.message,
    stack: err.stack
})
}

const sendErrorProd = (err, res) => {
    res.status(err.status_code).json({
    message: err.message
    })
}

errorHandlers.errorHandler =  (err, req, res, next)=> {
    if (err) {
        err.status_code = err.status_code || 500;
        if (env.NODE_ENV === 'development') {
            sendErrorDev(err, res);
        } else if (env.NODE_ENV === 'production') {
            sendErrorProd(err, res);
        }
        if(!err.isOperational){
            // do logging and stuff
            // should we restart or send generic error to the user like status 500 
            console.log(err)
            process.exit(1)
        }
    }else{    
        next()
    }
}

export default errorHandlers