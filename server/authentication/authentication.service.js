import {HTTP401Error} from '../errorHandling/error.classes'
import {getUsers} from "../user/user.repository"
import {createToken , checkPassword , verifyToken} from './authentication.utils'
import {token_types} from "../utils/constants"

export const login = async (user_data)=>{
    let password = user_data.password
    delete user_data.password
    user_data = await getUsers(user_data)
    if(!user_data.length){
        throw new HTTP401Error("Wrong username")
    }
    user_data = user_data[0]
    console.log(user_data)
    const same = await checkPassword(password , user_data.password)
    if(same){
        let access_data = {id:user_data.id , role:user_data.role , username:user_data.username}
        let refresh_data = {id:user_data.id}
        let access_token = await createToken(access_data, token_types.access)
        let refresh_token = await createToken(refresh_data ,token_types.refresh)
        return {access_token , refresh_token}
    }else{
        throw new HTTP401Error("Wrong  password")
    }
}


export const refresh = async (refresh_token)=>{
    let user_data = await verifyToken(refresh_token ,token_types.refresh)
    user_data = await getUsers({id:user_data.id})

    if(!user_data.length)
        throw new HTTP401Error()
    user_data = user_data[0]

    let access_data = {id:user_data.id , role:user_data.role , username:user_data.username}
    let access_token = await createToken(access_data, token_types.access)
    return access_token
}