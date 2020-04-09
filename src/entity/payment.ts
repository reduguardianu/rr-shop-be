import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Status } from '../models/payment.models';
import { PaymentType } from '../models/product.models';
import { URL_LENGTH } from './length-config';
import { Order } from './order';
import { stringConfig } from './string-config';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', { length: URL_LENGTH, nullable: true, default: null, ...stringConfig })
  public paymentUrl: string;

  @ManyToOne(type => Order)
  public order: Order;

  @Column('enum', { enum: Status, ...stringConfig })
  public status: Status;

  @Column('enum', { enum: PaymentType, ...stringConfig })
  public paymentType: PaymentType;

  @Column({ type: 'mediumtext', nullable: true, default: null, ...stringConfig })
  public logs: string;

  @Column({ type: 'mediumtext', nullable: true, default: null, ...stringConfig })
  public notes: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}