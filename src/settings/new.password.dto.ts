import {IsEmail, IsString, Length} from "class-validator";



export class NewPasswordDto {
    @IsString()
    @Length(7)
    newPassword:string
    @IsEmail()
    email:string
}