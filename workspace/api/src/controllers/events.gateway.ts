import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8082)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  public rooms = new Map<string, string[]>();
  @WebSocketServer() server: Server;

  afterInit() {
    Logger.log('Initialized socket!');
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      return;
    }
    const room = this.rooms.get(userId);
    if (!room) {
      return;
    }
    const index = room.indexOf(client.id);
    if (index === -1) {
      return;
    }
    room.splice(index, 1);
    if (room.length === 0) {
      this.rooms.delete(userId);
    } else {
      this.rooms.set(userId, room);
    }
    Logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      client.disconnect();
      return;
    }
    const room = this.rooms.get(userId);
    if (!room) {
      this.rooms.set(userId, [client.id]);
    } else {
      this.rooms.set(userId, [...room, client.id]);
    }
    Logger.log(`Client connected: ${client.id} ${userId}`);
  }
}
