import { Stock } from '../stock/stock.model';
import { StockChange } from '../stock/stockchange.model';

export class Datacreator {
  stock1: Stock = {
    id: 1,
    name: 'Vestasias',
    description: 'A large company full of windmills',
    rate: 133,
    changeRates: [],
  };
  stock2: Stock = {
    id: 2,
    name: 'Haha Hydraulik',
    description:
      'A small company working with hydraulics of all kinds, mainly on trucks',
    rate: 202,
    changeRates: [],
  };
  stock3: Stock = {
    id: 3,
    name: 'Hvamøsen',
    description: 'A small company creating trailers for agricultural use.',
    rate: 55,
    changeRates: [],
  };
  stock4: Stock = {
    id: 4,
    name: 'AlkoPrinteren',
    description: 'A small company working with printing labels.',
    rate: 966,
    changeRates: [],
  };

  changeRate1: StockChange = {
    id: 1,
    stock: this.stock1,
    changeTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    newValue: 55,
  };
  changeRate2: StockChange = {
    id: 2,
    stock: this.stock1,
    changeTime: new Date(new Date().getTime()),
    newValue: 133,
  };

  changeRate3: StockChange = {
    id: 3,
    stock: this.stock2,
    changeTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    newValue: 196,
  };
  changeRate4: StockChange = {
    id: 4,
    stock: this.stock2,
    changeTime: new Date(new Date().getTime()),
    newValue: 202,
  };

  changeRate5: StockChange = {
    id: 5,
    stock: this.stock3,
    changeTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    newValue: 18,
  };
  changeRate6: StockChange = {
    id: 6,
    stock: this.stock4,
    changeTime: new Date(new Date().getTime()),
    newValue: 55,
  };

  changeRate7: StockChange = {
    id: 7,
    stock: this.stock4,
    changeTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    newValue: 768,
  };
  changeRate8: StockChange = {
    id: 8,
    stock: this.stock4,
    changeTime: new Date(new Date().getTime()),
    newValue: 966,
  };

  private allStocks = [this.stock1, this.stock2, this.stock3, this.stock4];

  private allChangeRates = [
    this.changeRate1,
    this.changeRate2,
    this.changeRate3,
    this.changeRate4,
    this.changeRate5,
    this.changeRate6,
    this.changeRate7,
    this.changeRate8,
  ];

  public getNewStocks(): Stock[] {
    return this.allStocks;
  }

  public getNewChangeRates(): StockChange[] {
    return this.allChangeRates;
  }
}
