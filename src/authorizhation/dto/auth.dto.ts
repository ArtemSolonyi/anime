import {IsEmail, IsNotEmpty, IsString, Length, Min} from "class-validator";

export class AuthDto {
    @IsString()
    @Length(3,18)
    readonly username: string
    @IsEmail()
    @IsString()
    @Length(5)
    readonly email: string
    @IsString()
    @Length(8)
    readonly password: string

    readonly role?:string
}
export class AuthLoginDto{
    @IsString()
    @Length(3)
     login: string
    @IsString()
    @Length(8)
     password: string
}
export class AuthRefreshDto {
    @IsString()
    @IsNotEmpty()
    refreshToken:string
}