import { Injectable } from '@nestjs/common';
import { Stock } from '../stock.model';

@Injectable()
export class StockService {
  stock1: Stock = {
    id: 1,
    name: 'Vestasias',
    description: 'A large company full of windmills',
    rate: 1.33,
    changeRates: [
      {
        stockId: 1,
        changetime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
        newValue: 0.55,
      },
      {
        stockId: 1,
        changetime: new Date(new Date().getTime()),
        newValue: 1.33,
      },
    ],
  };
  stock2: Stock = {
    id: 2,
    name: 'Haha Hydraulik',
    description:
      'A small company working with hydraulics of all kinds, mainly on trucks',
    rate: 2.02,
    changeRates: [
      {
        stockId: 2,
        changetime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
        newValue: 1.96,
      },
      {
        stockId: 2,
        changetime: new Date(new Date().getTime()),
        newValue: 2.02,
      },
    ],
  };
  stock3: Stock = {
    id: 3,
    name: 'Hvamøsen',
    description: 'A small company creating trailers for agricultural use.',
    rate: 0.55,
    changeRates: [
      {
        stockId: 3,
        changetime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
        newValue: 1.8,
      },
      {
        stockId: 3,
        changetime: new Date(new Date().getTime()),
        newValue: 0.55,
      },
    ],
  };
  stock4: Stock = {
    id: 4,
    name: 'AlkoPrinteren',
    description: 'A small company working with printing labels.',
    rate: 9.66,
    changeRates: [
      {
        stockId: 4,
        changetime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
        newValue: 7.68,
      },
      {
        stockId: 4,
        changetime: new Date(new Date().getTime()),
        newValue: 9.66,
      },
    ],
  };
  private allStocks = [this.stock1, this.stock2, this.stock3, this.stock4];

  getAllStocks(): Stock[] {
    return this.allStocks;
  }

  updateStock(stock: Stock): void {
    const theIndex = this.allStocks.findIndex((st) => st.id === stock.id);
    this.allStocks[theIndex] = stock;
  }

  deleteStock(stock: Stock) {
    this.allStocks = this.allStocks.filter((st) => st.id !== stock.id);
    return this.allStocks;
  }
}
