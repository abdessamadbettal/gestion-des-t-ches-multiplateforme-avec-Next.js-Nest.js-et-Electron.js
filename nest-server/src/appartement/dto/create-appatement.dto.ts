import {
    IsString,
    IsNumber,
    IsNotEmpty,
} from "class-validator";

export class CreateAppartementDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsNotEmpty()
    etage: number;

    @IsString()
    @IsNotEmpty()
    bloc: string;

    @IsNumber()
    @IsNotEmpty()
    room: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
} 