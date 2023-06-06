import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppartementService {
    constructor (private prisma:PrismaService){}


    findAll(userid:number){
        return this.prisma.appartement.findMany({
            where:{
                userId:userid
            }
        })

        
    }

    findOne(userid:number , id:number){
        return this.prisma.appartement.findUnique({
            where:{
                id:id
            }
        })

    }

    create(userid:number , body){
        return this.prisma.appartement.create({
            data:{
                name:body.name,
                address:body.address,
                price:body.price,
                city:body.city,
                etage:body.etage,
                bloc:body.bloc,
                room:body.room,
                userId:userid
            }
        })
    }

    update(userid:number , body , id:number){
        return this.prisma.appartement.update({
            where:{
                id:id
            },
            data:{
                name:body.name,
                address:body.address,
                price:body.price,
                city:body.city,
                room:body.room,
                etage:body.etage,
                bloc:body.bloc,
                userId:userid
            }
        })

    }

    romove(id:number){
        return this.prisma.appartement.delete({
            where:{
                id:id
            }
        })
    }
}
