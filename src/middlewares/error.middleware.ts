import express,{Express,Response,Request,NextFunction} from 'express'
import HttpException from '@/utils/exceptions/http.exception'
  
export default function ErrorMiddleware(err:HttpException,req:Request,res:Response,next:NextFunction):void{
    const status = err.status || 500
    const message = err.message
    res.status(status);
    res.json({
        status,message
    })

}