import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAuctionLogService } from './product-auction-log.service';
import { ProductAuctionLog } from './entities/product-auction-log.entity';
import { CreateProductAuctionLogInput } from './dto/create-product-auction-log.input';

@Resolver(() => ProductAuctionLog)
export class ProductAuctionLogResolver {
  constructor(private readonly productAuctionLogService: ProductAuctionLogService) {}

  @Mutation(() => ProductAuctionLog)
  createProductAuctionLog(@Args('createProductAuctionLogInput') createProductAuctionLogInput: CreateProductAuctionLogInput) {
    return this.productAuctionLogService.create(createProductAuctionLogInput);
  }

}
