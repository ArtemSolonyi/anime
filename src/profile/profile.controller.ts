import {Body, Controller, Get, Patch} from "@nestjs/common";
import {ChangingUsernameDto} from "./dto/changing.nickname.dto";
import {ProfileService} from "./profile.service";
import {EmailDto} from "./dto/email.dto";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}



}