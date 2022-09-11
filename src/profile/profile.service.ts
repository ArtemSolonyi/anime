import {BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {VisibilityProfile} from "./entities/profile.entity";
import {Friend} from "../friends/entities/friend.entity";

type TProfile = User | { error: HttpStatus.NOT_FOUND, message: string }
type TProfileVisibility = { userId: number, userIdOfProfile: number, username: string }

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Friend) private friendRepository: Repository<Friend>,
    ) {
    }

    private async getProfile({userId, username}: { userId: number, username: string }): Promise<TProfile> {
        return await this.userRepository
            .createQueryBuilder('user')
            .where([{id: userId}, {username: username}])
            .leftJoinAndSelect("user.profile", 'profile')
            .select(["user.nickname","user.username", "profile.avatar", "profile.visibilityProfile"])
            .getOne() ?? {error: HttpStatus.NOT_FOUND, message: "User not found"};
    }

    private isUser(user: TProfile): user is User {
        return (user as User).nickname !== undefined
    }

    public async getProfileByVisibility({userIdOfProfile, userId, username}: TProfileVisibility) {
        const userProfile: TProfile = await this.getProfile({userId: userIdOfProfile, username: username})
        if (this.isUser(userProfile)) {
            switch (userProfile.profile.visibilityProfile) {
                case VisibilityProfile.ALL: {
                    return {nickname:userProfile.nickname,username:userProfile.username,avatar:userProfile.profile.avatar}
                }
                case VisibilityProfile.ONLY_FRIENDS: {
                    const friendsRelations = await this.friendRepository.findOne({
                        where: {userId: userId, friendId: userProfile.id,}
                    })
                    if (friendsRelations) {
                        return {nickname:userProfile.nickname,username:userProfile.username,avatar:userProfile.profile.avatar}
                    } else {
                        throw  new HttpException('You are not in list friend', HttpStatus.OK)
                    }
                }
                case VisibilityProfile.NOTHING: {
                    throw  new HttpException('Profile hidden', HttpStatus.OK)
                }
                default: {
                     throw new BadRequestException('Something went wrong')
                }
            }
        } else {
            return userProfile
        }
    }
}