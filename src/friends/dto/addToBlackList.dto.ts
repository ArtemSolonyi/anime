import {IsNotEmpty} from "class-validator";

export class AddToBlackListDto {
    @IsNotEmpty()
    userId:number
    @IsNotEmpty()
    fallingFriendInBlackList:number
}
