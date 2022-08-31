import {IsBase64, IsNumber, IsString, isString} from "class-validator";

export class ChangeAvatarDto {
    @IsString()
    @IsBase64()
    avatar:string
    @IsNumber()
    userId:number
}