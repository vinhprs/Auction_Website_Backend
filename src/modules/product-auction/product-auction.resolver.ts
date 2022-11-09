import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAuctionService } from './product-auction.service';
import { ProductAuction } from './entities/product-auction.entity';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { UpdateProductAuctionInput } from './dto/update-product-auction.input';

@Resolver(() => ProductAuction)
export class ProductAuctionResolver {
  constructor(private readonly productAuctionService: ProductAuctionService) {}

  @Mutation(() => ProductAuction)
  createProductAuction(@Args('createProductAuctionInput') createProductAuctionInput: CreateProductAuctionInput) {
    return this.productAuctionService.create(createProductAuctionInput);
  }

  @Query(() => [ProductAuction], { name: 'productAuction' })
  findAll() {
    return this.productAuctionService.findAll();
  }

  @Query(() => ProductAuction, { name: 'productAuction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productAuctionService.findOne(id);
  }

  @Mutation(() => ProductAuction)
  updateProductAuction(@Args('updateProductAuctionInput') updateProductAuctionInput: UpdateProductAuctionInput) {
    return this.productAuctionService.update(updateProductAuctionInput.id, updateProductAuctionInput);
  }

  @Mutation(() => ProductAuction)
  removeProductAuction(@Args('id', { type: () => Int }) id: number) {
    return this.productAuctionService.remove(id);
  }
}
