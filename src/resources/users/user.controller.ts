import validationMiddleware from "middlewares/validation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/Controller.interface";
import { Router } from "express";
import { Response,NextFunction ,Request} from "express";
import UserService from "./user.service";

class UserController implements Controller{
    public path = '/users'
    public router = Router()
    private UserService = new UserService()
    constructor(){
        this.initialiseRoutes()
    }
    private initialiseRoutes():void{
        this.
        router.post(this.path,validationMiddleware,this.create)
    }
    private create = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const {title,body} = req.body
        const user = await this.UserService.create(title,body)
        res.status(201).json({user})
    }catch(err){
        next(new HttpException(400,'Cannot create User'))
    }
    }
}