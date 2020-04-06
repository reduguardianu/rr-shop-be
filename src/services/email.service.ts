import { getRepository, Repository } from 'typeorm';

import { Email } from '../entity/email';
import { SimpleGmail } from '../simple-gmail/simple-gmail';

export class EmailService {
  public constructor(
    protected repository: Repository<Email> = getRepository(Email),
    protected simpleGmail: SimpleGmail = new SimpleGmail({
      clientId: '-----------------------------------------------------------------',
      clientSecret: '-------------------------',
      from: '-------- <------@--------->',
      redirectUri: 'https://developers.google.com/oauthplayground',
      refreshToken: '--------------------------------------------------------',
      user: '-------@---------'
    })
  ) {}

  public async add(to: string, subject: string, html: string): Promise<Email> {
    const email: Email = new Email();

    email.to = to;
    email.subject = subject;
    email.html = html;

    return await this.repository.save(email);
  }

  public async getEmailsForSend(limit: number): Promise<Email[]> {
    return await this.repository
      .createQueryBuilder('email')
      .select(['id', 'to', 'subject', 'html', 'createdAt'].map(c => `email.${c}`))
      .orderBy('email.id', 'ASC')
      .where('email.isSent = :isSent', { isSent: false })
      .limit(limit)
      .getMany();
  }

  public async sendEmails(emails: Email[]): Promise<void> {
    for (let i = 0; i < emails.length; i++) {
      const email: Email = emails[i];

      if (!email.isSent) {
        await this.simpleGmail.send(email.to, email.subject, email.html);
        email.isSent = true;
        await this.repository.save(email);
      }
    }
  }
}