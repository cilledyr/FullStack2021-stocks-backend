import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StockChangeEntity } from './stockChange.entity';

@Entity()
export class StockEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public rate: number;

  @OneToMany(
    () => StockChangeEntity,
    (stockChange: StockChangeEntity) => stockChange.changedStock,
  )
  public changeRates: StockChangeEntity[];
}
