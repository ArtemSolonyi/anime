import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Communication} from "./entities/communication.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Communication])],
  controllers: [CommunicationController],
  providers: [CommunicationService]
})
export class CommunicationModule {}
