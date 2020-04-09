import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Status } from '../models/order.models';
import { Email } from './email';
import {
  EMAIL_LENGTH,
  GENERIC_FORM_LENGTH,
  ORDER_NUMBER_LENGTH,
  PARCEL_LOCKER_LENGTH,
  PHONE_LENGTH,
  URL_LENGTH,
  UUID_LENGTH,
  ZIP_CODE_LENGTH
} from './length-config';
import { OrderItem } from './order-item';
import { Payment } from './payment';
import { PromoCode } from './promo-code';
import { stringConfig } from './string-config';
import { Supply } from './supply';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index({ unique: true })
  @Column('varchar', { length: UUID_LENGTH, ...stringConfig })
  public uuid: string;

  @Index({ unique: true })
  @Column('varchar', { length: ORDER_NUMBER_LENGTH, ...stringConfig }) // example: W-123-456-789
  public number: string;

  @OneToMany(type => Email, (email: Email) => email.order, { cascade: ['insert'] })
  public emails: Email[];

  @OneToMany(type => OrderItem, (orderItem: OrderItem) => orderItem.order, { cascade: ['insert'] })
  public orderItems: OrderItem[];

  @OneToMany(type => Payment, (payment: Payment) => payment.order, { cascade: ['insert'] })
  public payments: Payment[];

  @OneToMany(type => Supply, (supply: Supply) => supply.order)
  public supplies: Supply[];

  @ManyToOne(type => PromoCode)
  public promoCode: PromoCode;

  // ----------

  @Column('varchar', { length: EMAIL_LENGTH, ...stringConfig })
  public email: string;

  @Column('varchar', { length: PHONE_LENGTH, ...stringConfig })
  public phone: string;

  @Column('varchar', { length: GENERIC_FORM_LENGTH, ...stringConfig })
  public name: string;

  @Column('varchar', { length: GENERIC_FORM_LENGTH, ...stringConfig })
  public surname: string;

  @Column('varchar', { length: GENERIC_FORM_LENGTH, ...stringConfig })
  public address: string;

  @Column('varchar', { length: ZIP_CODE_LENGTH, ...stringConfig })
  public zipCode: string;

  @Column('varchar', { length: GENERIC_FORM_LENGTH, ...stringConfig })
  public city: string;

  @Column({ type: 'mediumtext', nullable: true, default: null, ...stringConfig })
  public comments: string;

  @Column('varchar', { length: PARCEL_LOCKER_LENGTH, nullable: true, default: null, ...stringConfig })
  public parcelLocker: string;

  // ----------

  @Column('enum', { enum: Status, ...stringConfig })
  public status: Status;

  // ----------

  @Column({ type: 'mediumtext', nullable: true, default: null, ...stringConfig })
  public notes: string;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
