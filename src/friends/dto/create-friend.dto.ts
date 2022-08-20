import {IsNotEmpty} from "class-validator";

export class AddingToFriendList {
    userId:number
    @IsNotEmpty()
    friendId:number
}
