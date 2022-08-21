
import { ServiceRequestInterface } from "../../interfaces/service/ServiceRequestInterface";
import prismaClient from "../../prisma";

class CreateServiceServices{
    async execute({description,price,service_time,user_id}:ServiceRequestInterface,){
        
        const service = prismaClient.service.create({
            data:{
                description: description,
                price: price,
                service_time: service_time,
                user_id: user_id,
            },
            select:{
                id: true,
                description: true,
                price: true,
                service_time: true,
                user_id: true
            }

        })
        return service
    }
}

export {CreateServiceServices}