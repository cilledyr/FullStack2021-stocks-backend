import { Stock } from './stock.model';

export interface StockChange {
  id: number;
  stock: Stock;
  changeTime: Date;
  newValue: number;
}
