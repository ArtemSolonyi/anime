import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import {OnlineStatusService} from './online-status.service';
import {UpdateOnlineStatusDto} from './dto/update-online-status.dto';
import {Socket} from "socket.io";


@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class OnlineStatusGateway{
    @WebSocketServer()
    server: Socket;
    clients: Map<string, string>;

    constructor(private readonly onlineStatusService: OnlineStatusService) {
        this.clients = new Map()
    }

    @SubscribeMessage('dic')
    async dic(client: any, data: any) {
        client.leave('online')
        this.server.to(`${data.username}`).emit('userInOnline',{online:false})
    }

    @SubscribeMessage('con')
    async connection(client: Socket, data: { username: string }) {
        this.clients.set(data.username, client.id)
        client.join('online')
        const roomOnline = await this.server.in('online').allSockets()
        this.server.to(`${data.username}`).emit('userInOnline', {online: roomOnline.has(this.clients.get(data.username))})
    }

    @SubscribeMessage('userInOnline')
    async userInOnline(client: any, data: any) {
        client.join(`${data.username}`)
        const roomOnline = await this.server.in('online').allSockets()
        this.server.to(`${data.username}`).emit('userInOnline', {online: roomOnline.has(this.clients.get(data.username))})
    }

}
