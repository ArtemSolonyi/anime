import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "../token/entities/token.entity";
import {Friend} from "./entities/friend.entity";
import {User} from "../users/entities/user.entity";
import {AcceptanceToFriendList} from "./entities/acceptance.to.friendlist.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Friend])
  ,TypeOrmModule.forFeature([AcceptanceToFriendList]),
    TypeOrmModule.forFeature([User])],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
