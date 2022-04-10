import * as service from "./user.service"
import {HTTP404Error} from "../errorHandling/error.classes"

export const createUser = async (req , res)=>{
    let user_data = req.body
    await service.createUser(user_data)
    res.sendStatus(201)
}

export const getUser = async (req , res)=>{
    let id = req.user_data.id
    let users = await service.getUsers({id})
    if(!users.length)
        throw new HTTP404Error()
    res.send(users[0])
}

export const updateUser = async (req , res)=>{
    let new_data = req.body
    await service.updateUser(new_data , {id:req.user_data.id})
    res.sendStatus(200)
}

export const deleteUser = async (req , res)=>{
    let id = req.user_data.id
    await service.deleteUser({id})
    res.sendStatus(200)
}


export const deposit = async (req , res)=>{
    let coins = req.body.coins
    let id = req.user_data.id
    await service.deposit(coins , {id})
    res.sendStatus(200)
}

export const reset = async (req , res)=>{
    let id = req.user_data.id
    let coins = await service.reset({id})
    res.send({coins})
}
