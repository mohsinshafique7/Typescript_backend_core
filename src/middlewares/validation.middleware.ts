import { RequestHandler,NextFunction,Request ,Response} from 'express';
import Joi from 'joi'

export default function validationMiddleware(schema:Joi.Schema):RequestHandler{
    return async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        const validateOptions ={
            abortEarly:false,
            allowUnknown:true,
            stripUnknown:true
        }
        try{
            const value = await schema.validateAsync(
                req.body,
                validateOptions
            )
            req.body = value
            next()
        }catch(e:any){
            const errors : string[] =[];
            e.details.forEach((error:Joi.ValidationErrorItem)=>{
                errors.push(error.message)

            })
            res.send(400).send({errors:errors})
        }
    }
}