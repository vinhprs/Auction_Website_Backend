import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 55 18 * * *')
  handleCron() {
    this.logger.debug('Called when time is 18:55');
  }
}
