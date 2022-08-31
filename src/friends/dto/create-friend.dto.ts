import {Type} from "class-transformer";
import {IsDefined, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";

export class AddingToFriendList {
    userId: number
    @IsOptional()
    @IsNumber()
    friendId: number
    @IsOptional()
    @IsString()
    friendName: string
}
