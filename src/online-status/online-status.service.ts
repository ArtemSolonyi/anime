import { Injectable } from '@nestjs/common';
import { CreateOnlineStatusDto } from './dto/create-online-status.dto';
import { UpdateOnlineStatusDto } from './dto/update-online-status.dto';

@Injectable()
export class OnlineStatusService {
  create(createOnlineStatusDto: string) {
    return 'This action adds a new onlineStatus';
  }

  findAll() {
    return `This action returns all onlineStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onlineStatus`;
  }

  update(id: number, updateOnlineStatusDto: UpdateOnlineStatusDto) {
    return `This action updates a #${id} onlineStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} onlineStatus`;
  }
}
