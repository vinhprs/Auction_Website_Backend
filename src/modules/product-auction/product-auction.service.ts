import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionFieldService } from '../auction-field/auction-field.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { ProductAuction } from './entities/product-auction.entity';
import { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
@Injectable()
export class ProductAuctionService {
  
  constructor(
    @InjectRepository(ProductAuction)
    private readonly productAuctionRepository: Repository<ProductAuction>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly auctionFieldService: AuctionFieldService
  ) {}

  async create(createProductAuctionInput: CreateProductAuctionInput , req: Request)
  : Promise<ProductAuction> {
    const { Product_ID,  Weight, Starting_Price,
      Discount_Rate, Auction_Field_ID  } = createProductAuctionInput;
    const userID = getUserIdFromRequest(req);

    const [ productRef, userRef, auctionFieldRef ] = await Promise.all([
      this.productService.getProductById(Product_ID),
      this.userService.getUserById(userID),
      this.auctionFieldService.getAuctionFieldById(Auction_Field_ID)
    ]);

    const newProductAuction = new ProductAuction();
    newProductAuction.Product_ID = productRef;
    newProductAuction.Auction_Field_ID = auctionFieldRef;
    newProductAuction.User_ID = userRef;
    newProductAuction.Weight = Weight;
    newProductAuction.Starting_Price = Starting_Price;
    newProductAuction.Discount_Rate = Discount_Rate;
    newProductAuction.Current_Price = Starting_Price;

    return await this.productAuctionRepository.save(newProductAuction);
  }

  async getProductAuctionById(Product_Auction_ID: string)
  : Promise<ProductAuction> {
    return await this.productAuctionRepository.findOneBy({Product_Auction_ID});
  }
}
