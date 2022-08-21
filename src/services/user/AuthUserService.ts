import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import { AuthRequestInterface } from "../../interfaces/user/AuthRequestInterface";

class AuthUserService{
    async execute({email,password}:AuthRequestInterface) {
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if (!user){
            throw new Error("E-mail ou senha invalido!")
        }
        //o compare é uma funcão já existente que compara uma string com um Hash para verificar se o mesmo password informado
        // é o que tem no banco, porém ele compara com a forma de "Hash"
        const passwordMath = await compare(password, user.password)

        if(!passwordMath){
            throw new Error("E-mail ou senha invalido!")
        }
        // gerando o Token e pegando algumas informações no parametro
        const token = sign(
        {
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET, 
        {
            subject: user.id,
            expiresIn: '10d'
        }
        )
        return {
            id: user.id,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}