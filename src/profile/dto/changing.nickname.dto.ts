import {IsNotEmpty} from "class-validator";

export class ChangingNicknameDtoDto {
    userId?: number
    @IsNotEmpty()
    nickname: string
}