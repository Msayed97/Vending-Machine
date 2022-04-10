import * as repository from './user.repository'
import bcrypt from 'bcrypt'
import {allowed_coins} from "../utils/constants"

export const createUser = async (user_data)=>{
    user_data.password = await createHash(user_data.password);
    await repository.createUser(user_data)
}


export const getUsers = async (user_data)=>{
    return  repository.getUsers(user_data , ['id' , 'username' , 'deposit' , 'role'])
}

export const updateUser = async (new_data , user_info )=>{
    if(new_data.password)
        new_data.password = await createHash(new_data.password);
    return  repository.updateUser(new_data , user_info)
}


export const deleteUser = async (user_data)=>{
    await repository.deleteUser(user_data)
}


export const deposit = async (coins, user_data)=>{
    await repository.deposit(coins , user_data)
}

export const reset = async (user_data)=>{
    let deposit = await repository.reset(user_data)
    let coins = {}
    for (let index = allowed_coins.length-1; index >=0 && deposit !=0; index--) {
        const coin = allowed_coins[index];
        const count = Math.floor(deposit / coin);
        deposit = deposit % coin
        if(count)
            coins[coin]=count
    }
    return coins
}


const createHash = async(password)=>{
    return bcrypt.hash(password ,8)
}
