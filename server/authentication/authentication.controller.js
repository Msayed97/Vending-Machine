import * as service from "./authentication.service"

export const login = async (req , res)=>{
    let user_data = req.body
    let tokens = await service.login(user_data)
    res.send(tokens)
}

export const refresh = async (req , res)=>{
    let refresh_token = req.headers.authorization
    if(refresh_token.startsWith("Bearer "))
        refresh_token = refresh_token.split(' ')[1]
    let access_token = await service.refresh(refresh_token)
    res.send({access_token})
}


