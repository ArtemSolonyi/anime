import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {AddingToFriendList} from './dto/create-friend.dto';
import {UpdateFriendDto} from './dto/update-friend.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Friend} from "./entities/friend.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";

@Injectable()
export class FriendsService {
    constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>,
                @InjectRepository(User) private userRepository: Repository<User>) {
    }

    async create(addToFriendListDto: AddingToFriendList): Promise<Promise<Friend> | NotFoundException> {
        const possibleFriend = await this.userRepository.findOneBy([{id: addToFriendListDto.friendId}])
        if (!possibleFriend) {
            throw new NotFoundException('User not exist')
        }
        const alreadyExistInFriendList = await this.friendRepository.findOneBy(
            {
                userId: addToFriendListDto.userId,
                friendId: addToFriendListDto.friendId
            })
        if (alreadyExistInFriendList) {
            throw new ConflictException('User already in your friend list')
        }
        const addToFriend = await this.friendRepository.create({
            userId: addToFriendListDto.userId,
            friendId: addToFriendListDto.friendId
        })
        return await this.friendRepository.save(addToFriend)
    }


    async getAllFriends(userId: number) {
        return await this.friendRepository.findBy({userId: userId})
    }

    findOne(id: number) {
        return `This action returns a #${id} friend`;
    }

    update(id: number, updateFriendDto: UpdateFriendDto) {
        return `This action updates a #${id} friend`;
    }

    remove(id: number) {
        return `This action removes a #${id} friend`;
    }
}
