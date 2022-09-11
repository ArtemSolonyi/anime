import {ConflictException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {AddingToFriendList} from './dto/create-friend.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Friend} from "./entities/friend.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {AddToBlackListDto} from "./dto/addToBlackList.dto";
import {AddToFavouriteListDto} from "./dto/addToFavouriteList.dto";
import {AddedFriend} from "./dto/added.friend.dto";
import {AcceptanceToFriendList} from "./entities/acceptance.to.friendlist.entity";

@Injectable()
export class FriendsService {
    constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>,
                @InjectRepository(AcceptanceToFriendList) private acceptanceToFriendListRepository: Repository<AcceptanceToFriendList>,
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
            const addToFriend = await this.acceptanceToFriendListRepository.create({
                userId: addToFriendListDto.userId,
                friendId: friendUserId,
                myConfirmation: true,
                friendConfirmation: false
            })
            const savedFriendRelations = await this.acceptanceToFriendListRepository.save(addToFriend)
            return {
                message: 'Friend request has been sent',
                friendId: savedFriendRelations.friendId,
                friendInfo: {username: friendUser.username},
                profile: {avatar: friendUser.profile?.avatar || null}
            }
        }
    }

    async findUser(username: string) {
        return await this.userRepository.findOne({where: {username: username}});
    }

    async getMyRequestsToFriends(userId: number) {
        return await this.acceptanceToFriendListRepository
            .createQueryBuilder('Accepte')
            .leftJoin('Accepte.friend', "friend")
            .leftJoin('friend.profile', 'profile')
            .select(['friend.id AS friendId',
                'friend.username AS username ',
                'profile.avatar AS avatar'])
            .where({userId: userId})
            .getRawMany()
    }

    async acceptFriendRelations(userId: number, friendId: number, answer: boolean) {
        const relations = await this.acceptanceToFriendListRepository.findOneBy(
                    {friendId: userId, userId: friendId, friendConfirmation: true})
        if (relations) {
            throw new HttpException('You already was accept invite', HttpStatus.BAD_REQUEST)
        }
        if (!answer) {
             this.acceptanceToFriendListRepository.delete({friendId: friendId, userId: userId})
            throw new HttpException('Successfully delete', HttpStatus.OK)
        }
        const acceptingToFriendList = await this.acceptanceToFriendListRepository.update(
            {friendId: userId, userId: friendId},
            {friendConfirmation: true});

        if (acceptingToFriendList.affected == 1 ) {
             this.acceptanceToFriendListRepository.delete({friendId: userId, userId: friendId,})
            const createFriendRelations = this.friendRepository.create({userId: userId, friendId: friendId});
            return await this.friendRepository.save(createFriendRelations);
        }

    }

    async getRequestsAcceptanceToFriendList(userId: number) {
        return await this.acceptanceToFriendListRepository
            .createQueryBuilder('Accept')
            .leftJoin('Accept.user', 'user')
            .leftJoin('user.profile', 'profile')
            .select(['user.id AS userId', 'user.username AS username', 'profile.avatar AS avatar'])
            .where({friendId: userId})
            .getRawMany()

    }

    async getAllFriends(userId: number) {
        const friend = await this.friendRepository
            .createQueryBuilder('Friend')
            .leftJoin('Friend.friendInfo', 'friendInfo')
            .leftJoin('friendInfo.profile', 'profile')
            .select(['Friend.friendId AS friendId',
                'Friend.userId',
                'friendInfo.nickname AS nickname',
                'friendInfo.username AS username',
                'profile.avatar AS avatar'])
            .where({userId: userId});


        return {
            favourite: await friend.andWhere({favourite: true}).getRawMany(),
            community: await friend.getRawMany()
        }


    }

    async blackList({userId, fallingFriendInBlackList, status}: AddToBlackListDto & { status: boolean }) {
        const friendToBlackList = await this.friendRepository
            .update(
                {userId: userId, friendId: fallingFriendInBlackList},
                {blackList: status});

        if (friendToBlackList.affected === 1) {
            throw  new HttpException(status ? 'User was successfully added to blacklist' : 'User was successfully remove from blacklist', HttpStatus.OK);
        } else {
            throw new HttpException("User wasn't added to blacklist", HttpStatus.BAD_REQUEST);
        }
    }

    async changeFavouriteList({userId, friendId, favouriteStatus}: AddToFavouriteListDto & { favouriteStatus: boolean })
    {
        const friendToFavouriteList = await this.friendRepository.update(
            {
                userId: userId,
                friendId: friendId
            }, {favourite: favouriteStatus});
        if (friendToFavouriteList.affected === 1) {
            throw  new HttpException(favouriteStatus ? 'User was successfully added to favourite list' : 'User was successfully remove from favourite list', HttpStatus.OK)
        }
    }

    async removeFromFriendList({userId, friendId}: { userId: number, friendId: number }) {
        return (await this.friendRepository.delete({
            userId,
            friendId
        })).affected == 1 ? {message: "User was removed from friendList"} : {message: "Friend not exist"}
    }


}
