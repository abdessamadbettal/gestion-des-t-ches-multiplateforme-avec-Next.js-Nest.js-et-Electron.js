import { IsOptional ,
    IsString ,
    IsNumber ,
    IsBoolean ,
    IsDate ,
    IsEnum ,
    IsArray ,
    IsObject ,
    IsNotEmpty

} from "class-validator";

export class EditAppartementDto {
    

    @IsString()
    @IsOptional()
    name?:string

    @IsString()
    @IsOptional()
    address?:string

    @IsNumber()
    @IsOptional()
    price?:number

    @IsString()
    @IsOptional()
    city?:string

    @IsNumber()
    @IsOptional()
    etage?:number
    
    @IsString()
    @IsOptional()
    bloc?:string
    
    @IsNumber()
    @IsOptional()
    room?:number

    @IsNumber()
    @IsOptional()
    userId?:number
}
