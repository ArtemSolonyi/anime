import {Body, Controller, Get, Param, Query} from "@nestjs/common";

import {ProfileService} from "./profile.service";

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    @Get('')
    async getPublicProfileOfUser(@Body() body: { userId: number }, @Query() queries: { userIdOfProfile?: number, username?: string }) {
        return await this.profileService.getProfileByVisibility(
            {userId: body.userId, userIdOfProfile: queries.userIdOfProfile, username: queries.username});
    }


}