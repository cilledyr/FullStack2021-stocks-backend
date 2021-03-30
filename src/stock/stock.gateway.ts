import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Stock } from './stock.model';
import { StockService } from './shared/stock.service';

@WebSocketGateway()
export class StockGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private stockService: StockService) {}
  @WebSocketServer() server;

  handleConnection(client: Socket, ...args): any {
    console.log('Client Connect', client.id);
    client.emit('stocks', this.stockService.getAllStocks());
  }

  handleDisconnect(client: any): any {
    console.log('Disconnected');
  }

  @SubscribeMessage('changedStock')
  async handleChangeStock(
    @MessageBody() stock: Stock,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(stock.name + ' has changed');
    this.stockService.updateStock(stock);
    this.server.emit('stocks', this.stockService.getAllStocks());
  }

  @SubscribeMessage('deleteStock')
  async handleDeleteStock(
    @MessageBody() stock: Stock,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(stock.name + ' has been deleted');
    const newList = this.stockService.deleteStock(stock);
    this.server.emit('stocks', newList);
  }
}
