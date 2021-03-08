import * as bodyParser from 'body-parser';
import express from 'express';

export class App {
    public app: any ;
    public port: number;

    constructor( controllers: any, port : number){
        this.app = express();
        this.port = port;
        this.initializeMiddleware();
        this.initilizeController(controllers)
    }
    
    private initializeMiddleware(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    // initilize my controller here
    private initilizeController(controllers: any){
        for (const controller of controllers){
            this.app.use('/', controller.router)
        }
       
    }

    public listen(){
        this.app.listen(this.port, () =>{
            console.log(`⚡️[server]: Server1 is running at http://localhost:${this.port}`);
            return console.log(`server is listening on ${this.port}`);
        })
    }

}