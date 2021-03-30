import { Module } from '@nestjs/common';
import { StockGateway } from './stock.gateway';
import { StockService } from './shared/stock.service';

@Module({
  providers: [StockGateway, StockService],
})
export class StockModule {}
