import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserBidLogService } from './user-bid-log.service';
import { UserBidLog } from './entities/user-bid-log.entity';
import { CreateUserBidLogInput } from './dto/create-user-bid-log.input';
import { UpdateUserBidLogInput } from './dto/update-user-bid-log.input';

@Resolver(() => UserBidLog)
export class UserBidLogResolver {
  constructor(private readonly userBidLogService: UserBidLogService) {}

  @Mutation(() => UserBidLog)
  createUserBidLog(@Args('createUserBidLogInput') createUserBidLogInput: CreateUserBidLogInput) {
    return this.userBidLogService.create(createUserBidLogInput);
  }

  @Query(() => [UserBidLog], { name: 'userBidLog' })
  findAll() {
    return this.userBidLogService.findAll();
  }

  @Query(() => UserBidLog, { name: 'userBidLog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userBidLogService.findOne(id);
  }

  @Mutation(() => UserBidLog)
  updateUserBidLog(@Args('updateUserBidLogInput') updateUserBidLogInput: UpdateUserBidLogInput) {
    return this.userBidLogService.update(updateUserBidLogInput.id, updateUserBidLogInput);
  }

  @Mutation(() => UserBidLog)
  removeUserBidLog(@Args('id', { type: () => Int }) id: number) {
    return this.userBidLogService.remove(id);
  }
}
