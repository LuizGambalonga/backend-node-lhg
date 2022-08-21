import prismaClient from '../../prisma';
import { hash } from 'bcryptjs'
import { UserRequestInterface } from '../../interfaces/user/UserRequestInterface';

class CreateUserService{
    async execute({name, email, password,user_privilege}: UserRequestInterface){

    if(!email){
        throw new Error("E-mail incorreto")
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        }
    )
    const passwordHash = await hash(password, 8)
    
    if(userAlreadyExists){
        throw new Error("Usuario já existente")
    }
    const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password: passwordHash,
            user_privilege: user_privilege
        },
        //o select devolve no response apenas oque nos queremos ver, neste caso não enviamos o "Password"
        select:{
            id: true,
            name: true,
            email: true,
            user_privilege: true
        }
    })
        return user;
    }
}

export {CreateUserService}