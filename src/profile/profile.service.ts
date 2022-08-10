import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    public async getInfoAboutProfile(userId: number) {
        const user = this.userRepository.findOneBy({id: userId})
        return
    }

}