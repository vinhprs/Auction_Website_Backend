import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAuctionLogService } from './product-auction-log.service';
import { ProductAuctionLog } from './entities/product-auction-log.entity';
import { CreateProductAuctionLogInput } from './dto/create-product-auction-log.input';
import { UpdateProductAuctionLogInput } from './dto/update-product-auction-log.input';

@Resolver(() => ProductAuctionLog)
export class ProductAuctionLogResolver {
  constructor(private readonly productAuctionLogService: ProductAuctionLogService) {}

  @Mutation(() => ProductAuctionLog)
  createProductAuctionLog(@Args('createProductAuctionLogInput') createProductAuctionLogInput: CreateProductAuctionLogInput) {
    return this.productAuctionLogService.create(createProductAuctionLogInput);
  }

  @Query(() => [ProductAuctionLog], { name: 'productAuctionLog' })
  findAll() {
    return this.productAuctionLogService.findAll();
  }

  @Query(() => ProductAuctionLog, { name: 'productAuctionLog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productAuctionLogService.findOne(id);
  }

  @Mutation(() => ProductAuctionLog)
  updateProductAuctionLog(@Args('updateProductAuctionLogInput') updateProductAuctionLogInput: UpdateProductAuctionLogInput) {
    return this.productAuctionLogService.update(updateProductAuctionLogInput.id, updateProductAuctionLogInput);
  }

  @Mutation(() => ProductAuctionLog)
  removeProductAuctionLog(@Args('id', { type: () => Int }) id: number) {
    return this.productAuctionLogService.remove(id);
  }
}
