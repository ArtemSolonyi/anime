import {IsNotEmpty} from "class-validator";

export class ChangingUsernameDto {
    @IsNotEmpty()
    userId: number
    @IsNotEmpty()
    username: string
}