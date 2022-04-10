
import {BaseError , HTTP400Error} from "../errorHandling/error.classes"


const validator =  (schema , type)=> {
  return async (req , res , next)=>{
      try{
        const result = await schema.validateAsync(req[type])
        req[type] = result
        next()
     }catch(error){
      if(!(error instanceof BaseError))
        throw new HTTP400Error(error.message , error.details?.[0].context.key)
      else
        throw error
     }
  }
}



export {validator}
