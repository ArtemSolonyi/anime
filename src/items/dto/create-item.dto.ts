import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Genre} from "../../genre/genre.entity";

export class CreateItemDto {
    id?:number
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    genre: {id:number,genreName:string}[]

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
    userId: number

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    typeInfo: string


    @IsNotEmpty()
    watchStatus:any

    @IsNotEmpty()
    @IsBoolean()
    favourite: boolean
}
