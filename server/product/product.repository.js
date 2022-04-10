import db from '../utils/db'
import {dbErrorHandler} from "../errorHandling/utils"
import {HTTP403Error , BaseError, HTTP400Error} from "../errorHandling/error.classes"

export const createProduct = async (prodcut_data)=>{
    try{
        await db("product").insert(prodcut_data)
    }catch(error){
        dbErrorHandler(error)
    }
}

export const getProducts = async (product_data)=>{
    try{
        let products= await db("product").select(db.raw('*')).where((builder) => {
            if (product_data)
                builder.where(product_data)
        })
        return products
    }catch(error){
        dbErrorHandler(error)
    }
}

export const updateProduct = async (product_data , user_info)=>{
    try{
        let rows_changes = await db("product").update(product_data).where({seller_id:user_info.id , id : product_data.id})
        if(!rows_changes)
            throw new HTTP403Error("User not allowed to update this product")
    }catch(error){
        if(error instanceof BaseError )
            throw error
        dbErrorHandler(error)
    }
}


export const deleteProduct = async (product_data , user_info)=>{
    try{
        let rows_changes = await db("product").where({id:product_data.id , seller_id: user_info.id}).del()
        if(!rows_changes)
            throw new HTTP403Error("User not allowed to delete this product")
    }catch(error){
        if(error instanceof BaseError )
            throw error
        dbErrorHandler(error)
    }
}



const buy_query = (product_data, user_data)=>[
    `UPDATE public.product x
    SET    amount = amount-${product_data.amount}
    WHERE  x.id = '${product_data.id}'`,

    `UPDATE public.user as x
    SET    deposit = MOD(x.deposit - y.cost*${product_data.amount} , 5 )
    FROM  (SELECT cost FROM public.product WHERE id = '${product_data.id}'  FOR UPDATE) y ,
        (SELECT deposit , id  FROM public.user WHERE id = '${user_data.id}'  FOR UPDATE)z
    WHERE  x.id = z.id and x.deposit >= y.cost*${product_data.amount}
    RETURNING y.cost*${product_data.amount} as spent , z.deposit as old_deposit `]

export const buy = async (product_data , user_data)=>{
    let  trx = await db.transaction();
    try{
       
        let result = await trx.raw(buy_query(product_data , user_data)[0])
        if(!result.rowCount)
            throw new HTTP400Error("No product with this id ")
        result = await trx.raw(buy_query(product_data , user_data)[1])
        if(!result.rowCount)
            throw new HTTP400Error("Your balance is less than the cost of the products")
        await trx.commit()
        return result.rows[0]
    }catch(error){
        await trx.rollback()
        if(error instanceof BaseError)
            throw error
        dbErrorHandler(error)
    }
}