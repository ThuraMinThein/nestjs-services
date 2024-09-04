import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'itemCountss',
})
export class ItemCountGateWay {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('count')
  handleItemCountEvent(@MessageBody() data: any) {
    this.server.emit('count', { data });
  }
}
