import {HttpStatus, Injectable} from "@nestjs/common";
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
            .select(["user.nickname", "profile.avatar","profile.visibilityProfile"])
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
                    return userProfile
                }
                case VisibilityProfile.ONLY_FRIENDS: {
                    const friendsRelations = await this.friendRepository.findOne({
                        where: {userId: userId,friendId:userProfile.id, }
                    })
                    return friendsRelations ? userProfile : {message: "You are not friend this person"}
                }
                case VisibilityProfile.NOTHING: {
                    return {message: "Profile hidden"}
                }
                default:{
                    return {message:"Something went wrong"}
                }
            }
        } else {
            return userProfile
        }
    }
}