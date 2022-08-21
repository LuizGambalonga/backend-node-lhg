import { Request,Response} from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';
class AuthUserController{
    async shoot(req: Request, res: Response){
        const {email, password} = req.body;

        const userService= new AuthUserService();

         const auth = await userService.execute({
            email,
            password
         })
        return res.json(auth)
    }
}

export {AuthUserController}