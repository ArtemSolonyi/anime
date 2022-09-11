import {IsBoolean, IsNumber} from "class-validator";

export class FriendAndUserDto {
    @IsNumber()
    userId:number
    @IsNumber()
    friendId:number
    @IsBoolean()
    answer:boolean
}