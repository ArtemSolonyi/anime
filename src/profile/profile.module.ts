import {Module} from "@nestjs/common";
import {ProfileController} from "./profile.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {ProfileService} from "./profile.service";

@Module({
    imports:[TypeOrmModule.forFeature([User]),],
    controllers:[ProfileController],
    providers:[ProfileService]
})
export class ProfileModule{}