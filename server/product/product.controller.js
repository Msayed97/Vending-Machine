import * as service from "./product.service"

export const createProduct = async (req , res)=>{
    let product_data = req.body
    let user_data = req.user_data
    await service.createProduct(product_data , user_data)
    res.sendStatus(201)
}


export const getProducts = async (req , res)=>{
    let products = await service.getProducts()
    res.send(products)
}

export const getProduct = async (req , res)=>{
    let id = req.params.id
    let product = await service.getProduct({id})
    res.send(product)
}

export const updateProduct = async (req , res)=>{
    let product_data = req.body
    product_data.id = req.params.id
    await service.updateProduct(product_data , req.user_data)
    res.sendStatus(200)
}

export const deleteProduct = async (req , res)=>{
    let id = req.params.id
    await service.deleteProduct({id} , req.user_data)
    res.sendStatus(200)
}


export const buy = async (req , res)=>{
    let product_info = {}
    product_info.id = req.params.id
    product_info.amount = req.body.amount
    let result = await service.buy(product_info , req.user_data)
    res.send(result)
}
