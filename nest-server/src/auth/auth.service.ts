import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";

@Injectable({}) // that's the default scope of the service , we use injectable to make it injectable in other services
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService ,
        private config: ConfigService
        ) { }

    async signup(dto: AuthDto) {
        const saltOrRounds = 10;
        const password = dto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);

        try {
            // create user
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    name: 'abdo',
                    role: 'USER',
                },
            });
            
            return this.signToken(user.id ,  user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('email already exists');
                }
            }
            throw error;
        }

    }

    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        if (!user) {
            throw new ForbiddenException('invalid credentials');
        }
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) {
            throw new ForbiddenException('invalid credentials');
        }
        return this.signToken(user.id ,  user.email);
    }


    async signToken(userId: number,email: string ,): Promise<{access_token : string}> {
        const payload = {
            userId,
            email 
        };
        const token = await this.jwt.signAsync(payload ,{
            expiresIn: this.config.get('JWT_EXPIRATION_TIME'),
            secret: this.config.get('JWT_SECRET')
        });

        return {
            access_token: token ,
        }
     } 

}