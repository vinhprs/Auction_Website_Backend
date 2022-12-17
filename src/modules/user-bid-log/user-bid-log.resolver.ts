import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserBidLogService } from './user-bid-log.service';
import { UserBidLog } from './entities/user-bid-log.entity';

@Resolver(() => UserBidLog)
export class UserBidLogResolver {
  constructor(private readonly userBidLogService: UserBidLogService) {}


}
