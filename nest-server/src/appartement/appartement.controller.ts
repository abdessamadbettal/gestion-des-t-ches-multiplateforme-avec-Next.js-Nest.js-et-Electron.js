import { Controller , Get, UseGuards , Post , Delete , Patch , Param , Body} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { AppartementService } from './appartement.service';
import { User } from '.prisma/client';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common';
import { CreateAppartementDto, EditAppartementDto } from './dto';

@UseGuards(JwtGuard)
@Controller('appartements')
export class AppartementController {
    constructor(private appartementService:AppartementService) {
         
    }

    @Get()
    findAll(@GetUser('id') userid:number ){
        return this.appartementService.findAll(userid)
    }
    @Post()
    create(@GetUser('id') userid:number , @Body() body:CreateAppartementDto){
        // return 'ggod'
        return this.appartementService.create(userid , body)
    }

    @Get(':id')
    findOne(@GetUser('id') userid:number , @Param('id', ParseIntPipe) id: number){
        return this.appartementService.findOne(userid , id )
    }


    @Patch(':id')
    update(@GetUser('id') userid:number , @Body() body:EditAppartementDto , @Param('id', ParseIntPipe) id: number){
        return this.appartementService.update(userid , body , id)
    }

    @Delete(':id')
    romove( @Param('id', ParseIntPipe) id: number){
        return this.appartementService.romove(id)
    }




}
