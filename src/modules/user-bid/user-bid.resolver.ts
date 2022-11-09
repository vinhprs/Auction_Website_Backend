import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserBidService } from './user-bid.service';
import { UserBid } from './entities/user-bid.entity';
import { CreateUserBidInput } from './dto/create-user-bid.input';
import { UpdateUserBidInput } from './dto/update-user-bid.input';

@Resolver(() => UserBid)
export class UserBidResolver {
  constructor(private readonly userBidService: UserBidService) {}

  @Mutation(() => UserBid)
  createUserBid(@Args('createUserBidInput') createUserBidInput: CreateUserBidInput) {
    return this.userBidService.create(createUserBidInput);
  }

  @Query(() => [UserBid], { name: 'userBid' })
  findAll() {
    return this.userBidService.findAll();
  }

  @Query(() => UserBid, { name: 'userBid' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userBidService.findOne(id);
  }

  @Mutation(() => UserBid)
  updateUserBid(@Args('updateUserBidInput') updateUserBidInput: UpdateUserBidInput) {
    return this.userBidService.update(updateUserBidInput.id, updateUserBidInput);
  }

  @Mutation(() => UserBid)
  removeUserBid(@Args('id', { type: () => Int }) id: number) {
    return this.userBidService.remove(id);
  }
}
