import {IsNotEmpty} from "class-validator";

export class ChangingEmailDto {
    @IsNotEmpty()
    secretTokenForLinkConfirmEmail:string
}