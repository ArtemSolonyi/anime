import {IsNotEmpty} from "class-validator";

export class ChangingUsernameDto {
    userId?: number
    @IsNotEmpty()
    username: string
}