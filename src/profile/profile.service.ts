import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {Profile} from "./entities/profile.entity";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                ) {
    }

    public async getPublicProfileOfUser({userId, username}: { userId: number, username: string }) {
        return this.userRepository
            .createQueryBuilder('user')
            .where([{id: userId},{username:username}])
            .leftJoinAndSelect("user.profile", 'profile')
            .select(["user.nickname", "profile.avatar"])
            .getOne();
    }

}