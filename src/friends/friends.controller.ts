import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {FriendsService} from './friends.service';
import {AddingToFriendList} from './dto/create-friend.dto';
import {AddToBlackListDto} from "./dto/addToBlackList.dto";
import {AddToFavouriteListDto} from "./dto/addToFavouriteList.dto";
import {UserId} from "../authorizhation/auth.service";
import {FriendAndUserDto} from "./dto/friendAndUser.dto";

@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {
    }

    @Post('/add')
    async addToFriendList(@Body() addToFriendList: AddingToFriendList) {
        return await this.friendsService.create(addToFriendList);
    }
    @Get('/get-my-requests-to-friends')
    async getAcceptanceToFriendList(@Body() body:UserId){
        return await this.friendsService.getMyRequestsToFriends(body.userId);
    }
    @Patch('/accept-friend-relations')
    async acceptFriendRelations(@Body() body:FriendAndUserDto){
        return await this.friendsService.acceptFriendRelations(body.userId,body.friendId,body.answer);
    }
    @Get('/get-requests-acceptance-to-friendList')
        async getRequestsAcceptanceToFriendList(@Body() body:UserId){
        return await this.friendsService.getRequestsAcceptanceToFriendList(body.userId)
    }

    @Get()
    async getAllFriends(@Body() body: UserId) {
        return await this.friendsService.getAllFriends(body.userId);
    }

    @Delete()
    async removeFromFriendList(@Body() body: FriendAndUserDto) {
        return await this.friendsService.removeFromFriendList(body);
    }

    @Patch('/add/to/blacklist')
    async addToBlackList(@Body() addToBlackList: AddToBlackListDto) {
        return await this.friendsService.blackList({...addToBlackList, status: true})
    }

    @Patch('/remove/from/black/list')
    async removeFromBlackList(@Body() addToBlackList: AddToBlackListDto) {
        return await this.friendsService.blackList({...addToBlackList, status: false})
    }

    @Patch('/addtofavouritelist')
    async addToFavouriteList(@Body() addToFavouriteList: AddToFavouriteListDto) {
        return await this.friendsService.changeFavouriteList({...addToFavouriteList, favouriteStatus: true})
    }

    @Get('/findUser/:username')
    async findUser(@Param('username') username: string) {
        return await this.friendsService.findUser(username);
    }

    @Delete('/removefromfavouritelist')
    async removeFromFavouriteList(@Body() addToFavouriteList: AddToFavouriteListDto) {
        return await this.friendsService.changeFavouriteList({...addToFavouriteList, favouriteStatus: false})
    }
}
