import {VisibilityProfile} from "../../profile/entities/profile.entity";
import {IsNotEmpty, IsString} from "class-validator";

export class VisibilityProfileDto {
    @IsNotEmpty()
    userId:number
    @IsString()
    visibilityProfile:VisibilityProfile
}