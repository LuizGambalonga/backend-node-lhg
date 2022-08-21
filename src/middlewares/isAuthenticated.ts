import { NextFunction, Request, Response } from "express";
import { Jwt, verify } from "jsonwebtoken";
import { PayloadRequestUserInterface } from "../interfaces/user/PayloadRequestUserInterface";

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    const authToken = req.headers.authorization;

    if (!authToken){
        return res.status(401).json({
            error: "Token não informado!"
        }).end();
    }
    //separando o Bearer do Token
    const [, token] = authToken.split(" ")
    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
            ) as PayloadRequestUserInterface;
        
         req.user_id = sub;   
        return next();       
    }catch(err){
        return res.status(401).json({
            error: "Este token não é valido!"
        }).end();
    }
   
}
