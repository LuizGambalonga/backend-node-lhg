import { Request,Response } from "express";
import { CreateServiceServices } from "../../services/service/CreateServiceServices";

class CreateServiceController{
    async shoot(req:Request,res:Response){
        const {description,price,service_time,user_id} = req.body;
        const createService = new CreateServiceServices();
        const service = await createService.execute({description,price,service_time,user_id})
        return res.json(service)
    }
}

export {CreateServiceController}