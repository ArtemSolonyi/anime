import {IsEmail, IsNotEmpty} from "class-validator";

export class RequestChangingEmailDto {
    @IsEmail()
    email:string
    @IsNotEmpty()
    userId:number
}