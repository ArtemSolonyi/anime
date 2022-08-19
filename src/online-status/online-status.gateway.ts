import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import {OnlineStatusService} from './online-status.service';

import {UpdateOnlineStatusDto} from './dto/update-online-status.dto';
import {from, map, Observable} from "rxjs";
import {ClientOptions, Server} from "ws";



@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class OnlineStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    client: any

    constructor(private readonly onlineStatusService: OnlineStatusService) {
    }


    @SubscribeMessage('con')
    connection(client:any) {
        this.server.emit('events',client.id)
    }

    @SubscribeMessage('identity')
    identity(client:any,) {

    }

    @SubscribeMessage('findAllOnlineStatus')
    findAll() {
        return this.onlineStatusService.findAll();
    }

    @SubscribeMessage('findOneOnlineStatus')
    findOne(@MessageBody() id: number) {
        return this.onlineStatusService.findOne(id);
    }

    @SubscribeMessage('updateOnlineStatus')
    update(@MessageBody() updateOnlineStatusDto: UpdateOnlineStatusDto) {
        return this.onlineStatusService.update(updateOnlineStatusDto.id, updateOnlineStatusDto);
    }

    @SubscribeMessage('removeOnlineStatus')
    remove(@MessageBody() id: number) {
        return this.onlineStatusService.remove(id);
    }

    handleDisconnect(client: any) {
    }

     handleConnection(client: any, ...args: any[]) {
         this.server.emit('events', 'artem')
    }
}
