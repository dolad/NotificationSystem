import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import {config} from './config/app'; 

export class App {
    public app: any ;
    public port: number;

    constructor( controllers: any, port : number){
        this.app = express();
        this.port = port;
        this.initializeMiddleware();
        this.initilizeController(controllers);
        this.initializeMongo();
    }
    
    private initializeMiddleware(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    // initilize my controller here
    private initilizeController(controllers: any){
        for (const controller of controllers){
            this.app.use('/', controller.router);
        }
       
    }

    private initializeMongo() {
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongo Connection Established');
        });
        connection.on('reconnected', () => {
            console.log('Mongo Connection Reestablished');
        });
        connection.on('disconnected', () => {
            console.log('Mongo Connection Disconnected');
            console.log('Trying to reconnect to Mongo ...');
            setTimeout(() => {
                mongoose.connect(config.db.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    keepAlive: true,
                    // socketTimeoutMS: 3000,
                    // connectTimeoutMS: 3000,
                });
            }, 3000);
        });
        connection.on('close', () => {
            console.log('Mongo Connection Closed');
        });
        connection.on('error', (error: Error) => {
            console.log('Mongo Connection ERROR: ' + error);
        });

        const run = async () => {
            await mongoose.connect(config.db.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferMaxEntries:0,
                keepAlive: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
        };
        run().catch((error: Error) => console.log(error));
    }

    public listen(){
        this.app.listen(this.port, () =>{
            console.log(`⚡️[server]: Server1 is running at http://localhost:${this.port}`);
            return console.log(`server is listening on ${this.port}`);
        })
    }

}
