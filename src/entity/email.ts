import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { EMAIL_LENGTH, GENERIC_LENGTH } from './length-config';
import { stringConfig } from './string-config';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', { length: EMAIL_LENGTH, ...stringConfig })
  public to: string;

  @Column('varchar', { length: GENERIC_LENGTH, ...stringConfig })
  public subject: string;

  @Column({ type: 'mediumtext', ...stringConfig })
  public html: string;

  @Column({ default: false })
  public isSent: boolean;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  public setTo(to: string): Email {
    this.to = to;

    return this;
  }

  public setSubject(subject: string): Email {
    this.subject = subject;

    return this;
  }

  public setHtml(html: string): Email {
    this.html = html;

    return this;
  }
}
