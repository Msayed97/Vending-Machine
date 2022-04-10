import {sign , verify} from 'jsonwebtoken'
import {token_config} from '../utils/constants'
import { HTTP401Error} from "../errorHandling/error.classes"
import bcrypt from "bcrypt"


export const createToken = (msg ,type)=>{
    return sign(msg ,token_config[type].secret, {expiresIn:token_config[type].expiration_time})
}


export const verifyToken = (token , type ,  msg = "unauthorized")=>{
    try{
        const data = verify(token , token_config[type].secret)
        return data
    }catch(error){
        throw new HTTP401Error(msg)
    }
}


export const checkPassword = async (password , passwordHash) => {
        return bcrypt.compare(password , passwordHash)  
}


