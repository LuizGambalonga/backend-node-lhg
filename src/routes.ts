import { Router} from "express";

import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { DetailUserController } from "./controller/user/DetailUserController";
import {isAuthenticated} from "./middlewares/isAuthenticated";
import { CreateServiceServices } from "./services/service/CreateServiceServices";
import { CreateServiceController } from "./controller/service/CreateServiceController";

const router = Router();


//Routes User
router.post('/users', new CreateUserController().shoot)
router.post('/session', new AuthUserController().shoot)
router.get('/userinfo', isAuthenticated, new DetailUserController().shoot)

//Routes Service
router.post('/service', isAuthenticated, new CreateServiceController().shoot)
export {router}