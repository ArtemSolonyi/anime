import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {FriendsService} from './friends.service';
import {AddingToFriendList} from './dto/create-friend.dto';
import {AddToBlackListDto} from "./dto/addToBlackList.dto";
import {AddToFavouriteListDto} from "./dto/addToFavouriteList.dto";

@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {
    }

    @Post('/add')
    async addToFriendList(@Body() addToFriendList: AddingToFriendList) {
        return await this.friendsService.create(addToFriendList);
    }

    @Get()
    async getAllFriends(@Body() body: { userId: number }) {
        return await this.friendsService.getAllFriends(body.userId);
    }
    @Delete()
    async removeFromFriendList(@Body() body:{userId:number,friendId:number}){
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
        return await this.friendsService.favouriteList({...addToFavouriteList,favouriteStatus:true})
    }
    @Delete('/removefromfavouritelist')
    async removeFromFavouriteList(@Body() addToFavouriteList: AddToFavouriteListDto) {
        return await this.friendsService.favouriteList({...addToFavouriteList,favouriteStatus:false})
    }
}
