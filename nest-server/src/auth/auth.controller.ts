import {Body, Controller , Post ,HttpCode, HttpStatus, } from '@nestjs/common';
import {AuthService} from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){ // inject service in controller that we can use it in controller
    }

    @HttpCode(HttpStatus.CREATED) //by defaut return 201 when get return 200
    @Post('signup')
    signup(@Body() dto:AuthDto){
        console.log({dto,});
        return this.authService.signup(dto);

    }


    @HttpCode(HttpStatus.OK)
    @Post('signin') 
    signin(@Body() dto:AuthDto){
        return this.authService.signin(dto);
    }
}