import e from 'express';
import * as fs from 'fs';

export let saveArray : Array<any> = []

export const fileExistsSync = (file:any) => {
    try {
        fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
        return true;
      } catch (err) {
        return false;
      }
}

export class SubscriptionService {
    private subscriptionToJson : string ;
    private holdSubscription : Array<any> ;
    private getSubscriptionFromJson :  Array<any> ;
    constructor(){
        this.subscriptionToJson = 'subscription.json';
        this.holdSubscription = [];
        this.getSubscriptionFromJson = []
    }
    public createSubscription (req:any, res:any, next:any)  {
        return new Promise (async (resolve, reject) => {
            try {
                const topic = req.params.topic;
                const url = req.body.url;
                const formData = {topic,url}
                const result =  this.saveSubscriptionToJSON(formData);
                // console.log('get some result',result);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    }

    public getAllSubscription(req:any, res:any, next:any){
        return new Promise (async (resolve, reject) => {
            try {
                const result = this.readSubscriptionJSON()
                resolve(result)
            } catch (error) {
                reject(error);
            }
        } )
    }

    // public getOneSubscription(req:any, res:any, next:any){
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const result =this.readSubscriptionJSON()
    //             resolve(result);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }

    private  saveSubscriptionToJSON(data:any) : any  {   
        try {
            const checkIfFileExist = fileExistsSync(this.subscriptionToJson);
            if (!checkIfFileExist){
                fs.writeFile(this.subscriptionToJson, JSON.stringify(data),(err) => {
                    if (err){
                      console.log(err)
                      return err
                    }
                     });
                    return data ;
            } else {
                fs.appendFile(this.subscriptionToJson, JSON.stringify(data), 'utf8',  (error) => {
                    if(error) return ; 
                })
            }
            
        } catch (error) {
            console.log(error)
        }
       
       
    }

    private async readSubscriptionJSON() : Promise<any> {
       const data = fs.readFileSync(this.subscriptionToJson, 'utf8' ) 
        console.log("inside get",data);
        this.getSubscriptionFromJson.push(JSON.parse(data));
        console.log('get all from json', this.getSubscriptionFromJson);
        return this.getSubscriptionFromJson;

    }

    
    
}