import { Module } from '@nestjs/common';
import { StockGateway } from './stock.gateway';
import { StockService } from './shared/stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from '../infrastructure/stock.entity';
import { StockChangeEntity } from '../infrastructure/stockChange.entity';
import { Datacreator } from '../infrastructure/datacreation';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity, StockChangeEntity])],
  providers: [StockGateway, StockService, Datacreator],
})
export class StockModule {}
