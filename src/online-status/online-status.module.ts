import { Module } from '@nestjs/common';
import { OnlineStatusService } from './online-status.service';
import { OnlineStatusGateway } from './online-status.gateway';

@Module({
  providers: [OnlineStatusGateway, OnlineStatusService]
})
export class OnlineStatusModule {}
