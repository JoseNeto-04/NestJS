import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

async create(data:CreateUserDTO) {

    return this.prisma.user.create({

        data,
    
    });

}

async list() {

    return this.prisma.user.findMany();

}

async show(id: number) {

    return this.prisma.user.findUnique({
        where: {
            id
        }

    })

}

async update(id: number, {email, name, password}: UpdatePutUserDTO) {
    console.log({email, name, password})

    if(email === undefined) {

        email = '';

    }
       

    return this.prisma.user.update({
        data:{

            name,
            email,
            password

        },
        where: {

            id
        }

    })

}

async updatePartial(id: number, data: UpdatePatchUserDTO) {

    console.log({data})

    return this.prisma.user.update({
        data,
        where: {
            id
        }
    })

}

        


}