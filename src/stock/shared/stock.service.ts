import { Injectable } from '@nestjs/common';
import { StockEntity } from '../../infrastructure/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Stock } from '../stock.model';
import { StockChangeEntity } from '../../infrastructure/stockChange.entity';
import { StockChange } from '../stockchange.model';
import { Datacreator } from '../../infrastructure/datacreation';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
    @InjectRepository(StockChangeEntity)
    private stockChangeRepository: Repository<StockChangeEntity>,
    private datacreator: Datacreator,
  ) {}

  async getAllStocks(): Promise<Stock[]> {
    let allTheStocks = await this.stockRepository.find();
    if (allTheStocks.length == 0) {
      let i = 0;
      const allStocks = this.datacreator.getNewStocks();
      while (i < allStocks.length) {
        const theStock = allStocks.find((s) => s.id == i + 1);
        let theDBStock = this.stockRepository.create();
        theDBStock.name = theStock.name;
        theDBStock.description = theStock.description;
        theDBStock.rate = theStock.rate;
        theDBStock = await this.stockRepository.save(theDBStock);
        i++;
      }
    }
    const allTheChangeRates = await this.stockChangeRepository.find();
    if (allTheChangeRates.length == 0) {
      let i = 0;
      const alltheChanges = this.datacreator.getNewChangeRates();
      while (i < alltheChanges.length) {
        const theChange = alltheChanges.find((c) => c.id == i + 1);
        let theDBChange = this.stockChangeRepository.create();

        theDBChange.changeTime = theChange.changeTime;
        theDBChange.newValue = theChange.newValue;
        const theStockEntity = await this.stockRepository.findOne(
          theChange.stock.id + 4,
        );
        if (theStockEntity) {
          theDBChange.changedStock = theStockEntity;
        }
        theDBChange = await this.stockChangeRepository.save(theDBChange);
        i++;
      }
    }
    allTheStocks = await this.stockRepository.find();
    const dbStocks: Stock[] = JSON.parse(JSON.stringify(allTheStocks));
    let j = 0;
    while (j < allTheStocks.length) {
      const theStock = await this.stockRepository.findOne(j + 5); // Plus 5 here, because i auto incremented and some rows were deleted.
      const theChanges = await this.stockChangeRepository.find({
        where: {
          changedStock: theStock,
        },
      });
      const theActualStock = dbStocks.find((s) => s.id === j +5 ); // Plus 5 here, because i auto incremented and some rows were deleted.
      const changes: StockChange[] = JSON.parse(JSON.stringify(theChanges));
      theActualStock.changeRates = changes;
      j++;
    }

    return dbStocks;
  }

  async updateStock(stock: Stock): Promise<void> {
    const theID = stock.id;
    const thestock = await this.stockRepository.findOne(theID);
    let theNewChange = await this.stockChangeRepository.create();
    theNewChange.changedStock = thestock;
    theNewChange.changeTime = new Date();
    theNewChange.newValue = stock.rate;

    theNewChange = await this.stockChangeRepository.save(theNewChange);

    //const theIndex = this.allStocks.findIndex((st) => st.id === stock.id);
    //this.allStocks[theIndex] = stock;
  }

  async deleteStock(stock: Stock): Promise<Stock[]> {
    const theStock = await this.stockRepository.findOne(stock.id);
    await this.stockChangeRepository.delete({ changedStock: theStock });
    await this.stockRepository.delete(stock.id);
    const allTheStocks = await this.stockRepository.find();
    const dbStocks: Stock[] = JSON.parse(JSON.stringify(allTheStocks));
    return dbStocks;
    //this.allStocks = this.allStocks.filter((st) => st.id !== stock.id);
    //return this.allStocks;
  }
}
