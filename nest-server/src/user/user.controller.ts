import { Controller , Get, UseGuards ,Req, Patch , Body } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '.prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService:UserService) {
         
    }

    @Get('me')
    getMe(@GetUser() user: User){
        return user
    }

    @Patch('me')
    editUser(@GetUser('id') userid:number , @Body() dto:EditUserDto){
        return this.userService.editUser(userid, dto);
    }
        
    

}
