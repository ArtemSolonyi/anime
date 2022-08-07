import {IsEmail, IsString, Length, Min} from "class-validator";

export class AuthDto {
    @IsString()
    @Length(3)
    readonly username: string
    @IsEmail()
    @IsString()
    @Length(3)
    readonly email: string
    @IsString()
    @Length(3)
    readonly password: string

    readonly role?:string
}
export class AuthLoginDto{
    @IsEmail()
    @IsString()
    @Length(3)
    readonly email: string
    @IsString()
    @Length(3)
    readonly password: string
}