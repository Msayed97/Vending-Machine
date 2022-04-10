import * as repository from './product.repository'
import {allowed_coins} from "../utils/constants"

export const createProduct = async (product_data , user_data)=>{
    product_data.seller_id = user_data.id
    await repository.createProduct(product_data)
}


export const getProducts = async ()=>{
    return repository.getProducts()
}

export const getProduct = async (product_data)=>{
    let products = await repository.getProducts(product_data)
    return products.length? products[0]:{}
}

export const updateProduct = async (product_data , user_info )=>{
    return  repository.updateProduct(product_data , user_info)
}


export const deleteProduct = async (product_data , user_info)=>{
    await repository.deleteProduct(product_data , user_info)
}

export const buy = async (product_data , user_info)=>{
    let result = await repository.buy(product_data , user_info)
    let change = result.old_deposit - result.spent
    let coins = {}
    for (let index = allowed_coins.length-1; index >=0 && change !=0; index--) {
                const coin = allowed_coins[index];
                const count = Math.floor(change / coin);
                change = change % coin
                if(count)
                    coins[coin]=count
    }
    return {change:coins , total_spent:result.spent , products_count : product_data.amount}
}
