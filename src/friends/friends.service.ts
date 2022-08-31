import {ConflictException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {AddingToFriendList} from './dto/create-friend.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Friend} from "./entities/friend.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {AddToBlackListDto} from "./dto/addToBlackList.dto";
import {AddToFavouriteListDto} from "./dto/addToFavouriteList.dto";
import {AddedFriend} from "./dto/added.friend.dto";

@Injectable()
export class FriendsService {
    constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>,
                @InjectRepository(User) private userRepository: Repository<User>) {
    }

    async create(addToFriendListDto: AddingToFriendList): Promise<Promise<AddedFriend> | NotFoundException> {
        let friendUserId: number
        let friendUser: User

        friendUser = await this.userRepository.findOne({
            where: [{username: addToFriendListDto.friendName}, {id: addToFriendListDto.friendId}],
            relations: {profile: true}
        })
        if (!friendUser) {
            throw new NotFoundException('User not exist')
        } else {
            friendUserId = friendUser.id
            const alreadyExistInFriendList = await this.friendRepository.findOneBy(
                [{
                    userId: addToFriendListDto.userId,
                    friendId: friendUserId
                }])
            if (alreadyExistInFriendList) {
                throw new ConflictException('User already in your friend list')
            }
            const addToFriend = await this.friendRepository.create({
                userId: addToFriendListDto.userId,
                friendId: friendUserId
            })
            const savedFriendRelations = await this.friendRepository.save({
                ...addToFriend,
                username: friendUser.username
            })
            return {
                message: 'User was added to friend list successfully',
                friendId: savedFriendRelations.friendId,
                friends: {username: friendUser.username},
                profile: {avatar: friendUser.profile?.avatar || null}
            }
        }
    }


    async getAllFriends(userId: number) {
        const friend = await this.friendRepository
            .createQueryBuilder('Friend')
            .leftJoinAndSelect('Friend.friends', 'friends')
            .leftJoinAndSelect('friends.profile', 'profile')
            .where({userId: userId})
        return {
            favourite: await friend.where({favourite: true}).getMany(),
            community: await friend.where({favourite: false}).getMany()
        }


    }

    async blackList({userId, fallingFriendInBlackList, status}: AddToBlackListDto & { status: boolean }) {
        const friendToBlackList = await this.friendRepository
            .update(
                {userId: userId, friendId: fallingFriendInBlackList},
                {blackList: status})

        if (friendToBlackList.affected === 1) {
            throw  new HttpException(status ? 'User was successfully added to blacklist' : 'User was successfully remove from blacklist', HttpStatus.OK)
        } else {
            throw new HttpException("User wasn't added to blacklist", HttpStatus.BAD_REQUEST)
        }
    }

    async favouriteList({userId, friendId, favouriteStatus}: AddToFavouriteListDto & { favouriteStatus: boolean }) {
        const friendToFavouriteList = await this.friendRepository.update(
            {
                userId: userId,
                friendId: friendId
            }, {favourite: favouriteStatus})
        if (friendToFavouriteList.affected === 1) {
            throw  new HttpException(favouriteStatus ? 'User was successfully added to favourite list' : 'User was successfully remove from favourite list', HttpStatus.OK)
        }
    }
    async removeFromFriendList({userId,friendId}:{userId:number,friendId:number}){
        return (await this.friendRepository.delete({userId, friendId})).affected == 1? {message:"User was removed from friendList"} :{message:"Friend not exist"}
    }


}
