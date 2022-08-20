import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {FriendsService} from './friends.service';
import {AddingToFriendList} from './dto/create-friend.dto';
import {UpdateFriendDto} from './dto/update-friend.dto';

@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {
    }

    @Post('/add')
    async create(@Body() addToFriendList: AddingToFriendList) {
        return await this.friendsService.create(addToFriendList);
    }

    @Get()
    async getAllFriends(@Body() body: { userId: number }) {
        return await this.friendsService.getAllFriends(body.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.friendsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
        return this.friendsService.update(+id, updateFriendDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.friendsService.remove(+id);
    }
}
