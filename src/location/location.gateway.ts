import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Location } from './location.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LocationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('LocationGateway');

  afterInit(server: Server) {
    this.logger.log('Location WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Method to emit new location to all connected clients
  emitNewLocation(location: Location) {
    this.server.emit('newLocation', location);
  }

  // Method to emit location history to all connected clients
  emitLocationHistory(locations: Location[]) {
    this.server.emit('locationHistory', locations);
  }
}
