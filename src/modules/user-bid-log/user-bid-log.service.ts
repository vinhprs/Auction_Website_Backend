import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { time } from 'console';
import { Repository } from 'typeorm';
import { UserBid } from '../user-bid/entities/user-bid.entity';
import { CreateUserBidLogInput } from './dto/create-user-bid-log.input';
import { UserBidLog } from './entities/user-bid-log.entity';

@Injectable()
export class UserBidLogService {

  constructor(
    @InjectRepository(UserBidLog)
    private readonly userBidLogRepository: Repository<UserBidLog>
  ) {}

  async genUserBidLog(userBid: UserBid)
  : Promise<UserBidLog> {
    const { Price, Time } = userBid;

    const newBidLog = new UserBidLog();
    newBidLog.Price = Price;
    newBidLog.Time = Time;
    newBidLog.userBrid = userBid;

    return await this.userBidLogRepository.save(newBidLog);
  }

}
