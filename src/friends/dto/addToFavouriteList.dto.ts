import {IsNotEmpty} from "class-validator";

export class AddToFavouriteListDto {
    @IsNotEmpty()
    userId:number
    @IsNotEmpty()
    friendId:number
}