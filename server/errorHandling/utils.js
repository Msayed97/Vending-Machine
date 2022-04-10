import {BaseError, HTTP400Error , HTTP500Error} from './error.classes'

const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch((err) => {
        console.error(err)
        next(err instanceof BaseError ? err : new HTTP500Error())
      })
    };
};

const dbErrorHandler = (error)=>{
  const errorCode =error.code 
  switch(errorCode) {
    case "23505":
      throw new HTTP400Error(error.detail)
    case "23514":
        if(error.table == "product")
          throw new HTTP400Error("You requested amount larger than the available amount of the product")
        else if (error.table == "user")
          throw new HTTP400Error("Your balance is lower than products cost")
        else
          throw new HTTP500Error()
    default:
      throw new HTTP500Error()
  } 
}


export {catchAsync , dbErrorHandler}