import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
} from '@nestjs/websockets';
import {OnlineStatusService} from './online-status.service';
import {Socket} from "socket.io";
import {Cache} from 'cache-manager';
import {CACHE_MANAGER, Inject} from "@nestjs/common";

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class OnlineStatusGateway {
    @WebSocketServer()
    server: Socket;
    clients: Map<string, string>;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache,
                private readonly onlineStatusService: OnlineStatusService) {
        this.clients = new Map()
    }

    @SubscribeMessage('dic')
    async dic(client: Socket, data: any) {
        client.leave('online')
        await this.cacheManager.set(`t${client.handshake.auth.username}`, data.dateLeave)
        this.server.to(`${client.handshake.auth.username}`).emit('userInOnline', {
            online: false,
            timeStatus: data.dateLeave
        })
    }

    @SubscribeMessage('con')
    async connection(client: Socket) {
        let username = client.handshake.auth.username
        await this.cacheManager.set(username,client.id)
        console.log(await this.cacheManager.store.keys())
        client.join('online')
        this.server.to(`${username}`).emit('userInOnline', {online: true})
    }

    @SubscribeMessage('userInOnline')
    async userInOnline(client: any, data: any) {
        client.join(`${data.username}`)
        const roomOnline = await this.server.in('online').allSockets()
        this.server.to(`${data.username}`).emit('userInOnline', {
            online: roomOnline.has(await this.cacheManager.get(data.username)),
            timeStatus:await this.cacheManager.get(`t${data.username}`)
        })
    }

}
