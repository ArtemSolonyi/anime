import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    genre: string

    @IsNotEmpty()
    @IsString()
    studio: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    @IsNotEmpty()
    author: string

    @IsString()
    @IsNotEmpty()
    season: string

    @IsNumber()
    @IsNotEmpty()
    year: number

    @IsNotEmpty()
    user: number

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    typeInfo: string

    @IsString()
    @IsNotEmpty()
    watchStatus:string

    @IsNotEmpty()
    @IsBoolean()
    favourite: boolean
}
