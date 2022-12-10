import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { formatTime } from '../utils/date.util';
import { AuctionFieldService } from '../modules/auction-field/auction-field.service';
import { AuctionField } from '../modules/auction-field/entities/auction-field.entity';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  constructor(
    private readonly auctionFieldService: AuctionFieldService
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 10 21 * * *')
  async handleCron() {
    let auctionField = await this.auctionFieldService.getAll();
    const now = new Date(Date.now())
    const sameDateAuction = auctionField.filter(a => 
      a.Start_Time.getFullYear() === now.getFullYear() &&
      a.Start_Time.getMonth() === now.getMonth() &&
      a.Start_Time.getDate() === now.getDate()
    );

    sameDateAuction.forEach(async (a) => {
      const startTime = a.Start_Time;
      const { hour, minute, second } = formatTime(startTime);
      await this.auctionOperate(a, hour, minute, second);
    });
  }

  async auctionOperate(auctionField: AuctionField , hour: number, 
    minute: number, second: number) {
    const job = new CronJob(`${second} ${minute} ${hour} * * *`,async () => {
      await this.auctionFieldService.setOperation(auctionField);
    })
    job.start()
  }

}
