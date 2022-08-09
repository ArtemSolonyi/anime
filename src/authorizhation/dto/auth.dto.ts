import {IsEmail, IsNotEmpty, IsString, Length, Min} from "class-validator";

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
    @IsString()
    @Length(3)
     login: string
    @IsString()
    @Length(3)
     password: string
}
export class AuthRefreshDto {
    @IsString()
    @IsNotEmpty()
    refreshToken:string
}