

const user_types = {buyer:"Buyer" , seller:"Seller"}
const token_config = {access: { secret:process.env.ACCESS_TOKEN_SECRET , expiration_time :"1h" } ,
                    refresh: { secret:process.env.REFRESH_TOKEN_SECRET , expiration_time :"360d" } }
const token_types = []
Object.keys(token_config).forEach(type=>{
    token_types[type]=type
})

const allowed_coins = [5,10,20,50,100]
const env ={
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    DB_NAME:process.env.DB_NAME,
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    NODE_ENV:process.env.NODE_ENV,
    HOST:process.env.HOST,
    DB_PORT:process.env.DB_PORT,

}

export {user_types , token_types , token_config , env , allowed_coins}

