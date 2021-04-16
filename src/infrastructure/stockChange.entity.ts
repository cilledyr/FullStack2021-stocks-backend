import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StockEntity } from './stock.entity';

@Entity()
export class StockChangeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  changeTime: Date;

  @Column()
  newValue: number;

  @ManyToOne(() => StockEntity, (Stock: StockEntity) => Stock.changeRates, {
    eager: true,
  })
  public changedStock: StockEntity;
}
