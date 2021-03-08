import {Router} from '../routes/index';
import { NextFunction, Request, Response } from 'express';
import {SubscriptionService} from '../services/SubscriptionService';
export class Subscription extends Router {
    constructor(){
        super();
        this._initializeRoutes();
    }

    private _initializeRoutes(){
        this.router.post('/subscribe/:topic', this.createSubscription);
        this.router.get('/subscribe', this.getSubscription)
    }
    private async createSubscription(req : Request , res: Response, next: NextFunction){
        try {
            const subscription = new SubscriptionService();
            const response = await subscription.createSubscription(req, res, next);
            console.log('response', response);
            return res.status(200).json(response);            
        } catch (error) {
            return res.status(500).json({message:error.message, error:"error"})
        }
    }

    private async getSubscription(req : Request , res: Response, next: NextFunction){
        try {
            const subscription = new SubscriptionService();
            const response = await subscription.getAllSubscription(req, res, next);
            return res.status(200).json({response})
        } catch (error) {
            return res.status(500).json({message:error.message, error:"error"})
        }
    }
}