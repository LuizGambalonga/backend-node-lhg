import { Request,Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async shoot(req:Request,res:Response){
        const {name, email,password, user_privilege} = req.body

        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
           name,
           email,
           password,
           user_privilege
        })
  
      return res.json(user)
     }
  }

export  {CreateUserController}
