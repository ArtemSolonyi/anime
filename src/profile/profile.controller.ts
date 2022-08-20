import {Body, Controller, Get, Param, Query} from "@nestjs/common";

import {ProfileService} from "./profile.service";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }
    @Get('')
    async getPublicProfileOfUser(@Body() body:{userId:number}, @Query() queries: {username:string}) {
        return await this.profileService.getPublicProfileOfUser({userId:body.userId,username:queries.username});
    }


}