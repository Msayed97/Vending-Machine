import db from '../utils/db'
import {dbErrorHandler} from "../errorHandling/utils"

export const createUser = async (user_data)=>{
    try{
        await db("user").insert(user_data)
    }catch(error){
        dbErrorHandler(error)
    }
}

export const getUsers = async (user_data  , select_fields)=>{
    select_fields = !select_fields? db.raw('*'): select_fields
    try{
        let user= await db("user").select(select_fields).where(user_data)
        return user
    }catch(error){
        dbErrorHandler(error)
    }
}

export const updateUser = async (user_data , user_info)=>{
    try{
        await db("user").update(user_data).where(user_info)
    }catch(error){
        dbErrorHandler(error)
    }
}


export const deleteUser = async (user_data)=>{
    try{
        await db("user").where(user_data).del()
    }catch(error){
        dbErrorHandler(error)
    }
}

export const deposit = async (coins,user_data)=>{
    try{
        await db("user").update({deposit: db.raw(`?? + ${coins}`, ['deposit'])}).where(user_data)
    }catch(error){
        dbErrorHandler(error)
    }
}


const reset_query = (user_data)=>
    `UPDATE public.user x
    SET    deposit = MOD(x.deposit , 5)
    FROM  (SELECT deposit , id FROM public.user WHERE id = '${user_data.id}'  FOR UPDATE) y 
    WHERE  x.id = y.id
    RETURNING y.deposit - MOD(y.deposit,5) as deposit `

export const reset = async (user_data)=>{
    try{
        let result = await db.raw(reset_query(user_data))
        let rows = result.rows
        let deposit = rows.length? rows[0].deposit: 0
        return deposit
    }catch(error){
        dbErrorHandler(error)
    }
}