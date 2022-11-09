import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuctionFieldService } from './auction-field.service';
import { AuctionField } from './entities/auction-field.entity';
import { CreateAuctionFieldInput } from './dto/create-auction-field.input';
import { UpdateAuctionFieldInput } from './dto/update-auction-field.input';

@Resolver(() => AuctionField)
export class AuctionFieldResolver {
  constructor(private readonly auctionFieldService: AuctionFieldService) {}

  @Mutation(() => AuctionField)
  createAuctionField(@Args('createAuctionFieldInput') createAuctionFieldInput: CreateAuctionFieldInput) {
    return this.auctionFieldService.create(createAuctionFieldInput);
  }

  @Query(() => [AuctionField], { name: 'auctionField' })
  findAll() {
    return this.auctionFieldService.findAll();
  }

  @Query(() => AuctionField, { name: 'auctionField' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.auctionFieldService.findOne(id);
  }

  @Mutation(() => AuctionField)
  updateAuctionField(@Args('updateAuctionFieldInput') updateAuctionFieldInput: UpdateAuctionFieldInput) {
    return this.auctionFieldService.update(updateAuctionFieldInput.id, updateAuctionFieldInput);
  }

  @Mutation(() => AuctionField)
  removeAuctionField(@Args('id', { type: () => Int }) id: number) {
    return this.auctionFieldService.remove(id);
  }
}
