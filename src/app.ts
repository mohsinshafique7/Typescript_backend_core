import express,{Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/Controller.interface'
import ErrorMiddleware from "@/middlewares/error.middleware"
import helmet from 'helmet'

class App {
    public express:Application
    public port:number
    constructor(controllers:Controller[],port:number){
        this.express = express()
        this.port = port
        this.intialiseDatabaseConection();
        this.intialiseMiddleware();
        this.intialiseControllers(controllers);
        this.intialiseErrorHandling()
        this.listen()
    }

    private intialiseMiddleware():void{
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())
        this.express.use(express.urlencoded({extended:false}))
        this.express.use(compression())
    }
    private intialiseControllers(controller:Controller[]):void{
        controller.forEach((controller:Controller)=>{
            this.express.use('/api',controller.router)
        })
    }

    private intialiseErrorHandling():void{
        this.express.use(ErrorMiddleware)
    }
    private intialiseDatabaseConection():void{

    }
    public listen():void{
        this.express.listen(this.port,()=>{
            console.log(`Listening On Port ${this.port}`)
        })
    }
}
export default App