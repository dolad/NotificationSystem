import * as fs from 'fs';
import {Subscriber} from  '../models/subscriber'
import mongoose from 'mongoose';

export class SubscriptionService {
   
    public createSubscription (req:any, res:any, next:any)  {
        return new Promise (async (resolve, reject) => {
            try {
                const subscriber = new Subscriber({
                    id:new mongoose.Types.ObjectId(),
                    topic: req.params.topic,
                    url:req.body.url
                })
                const saveSubscriber = subscriber.save();
                // const {topic, url} = saveSubscriber;
               const topic = (await saveSubscriber).topic;
               const url = (await saveSubscriber).url;

                resolve({topic, url});
                                
            } catch (error) {
                reject(error);
            }
        })
    }

    public async getAllSubscription(req:any, res:any, next:any){
        return new Promise (async (resolve, reject) => {
            try {
                const subscriber = await Subscriber.find({}).exec();
                if(subscriber.length !== null){
                    resolve(subscriber);
                }else{
                    return res
                    .status(409)
                    .json({message:"cant any subscriber", error:true});
                }
            } catch (error) {
                reject(error);
            }
        } )
    }

    public async getSubscription (req:any, res:any, next:any){
        return new Promise(async (resolve, reject) => {
            try {
                const subscriber = await Subscriber.findOne({topic:req.params.topic}).exec();
                if(subscriber !== null){
                    resolve(subscriber);
                }else{
                    return res.status(404).json({message:"cant find subscriber", error:true})
                }
            } catch (error) {
                
            }
        })
    }
    
}