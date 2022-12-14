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
import { ProductAuctionLogService } from '../product-auction-log/product-auction-log.service';
import { ProductAuctionLog } from '../product-auction-log/entities/product-auction-log.entity';
import { Product } from '../product/entities/product.entity';
import { AuctionField } from '../auction-field/entities/auction-field.entity';
@Injectable()
export class ProductAuctionService {
  
  constructor(
    @InjectRepository(ProductAuction)
    private readonly productAuctionRepository: Repository<ProductAuction>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly auctionFieldService: AuctionFieldService,
    private readonly productAuctionLogService: ProductAuctionLogService
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
    await this.productAuctionRepository.save(newProductAuction);

    const currentWeight = productRef.Weight - Weight;
    if(currentWeight < 0) {
      throw new Error("Exceed your product's max weight!");
    }
    await Promise.all([
      this.creatProductAuctionLog(Starting_Price, newProductAuction),
      this.productService.updateCurrentProduct(Product_ID, currentWeight)
    ]);

    return newProductAuction;
  }

  async getProductAuctionById(Product_Auction_ID: string)
  : Promise<ProductAuction> {
    const result = await this.productAuctionRepository.findOne({
      where: {
        Product_Auction_ID
      },
      relations: { 
        Product_ID: true,
        Auction_Field_ID: true
      }
    });

    return result;
  }

  async getAuctioningProduct() : Promise<ProductAuction[]> {
    const operatingAuction = await this.auctionFieldService.getOperatingAuctionField();

    let result : ProductAuction[] = [];
    operatingAuction.forEach(p => {
      result = result.concat(p.Product_Auction)
    });
    return result;
  }

  async getAuctioningProductByCatalog(Catalog_Name: string)
  : Promise<ProductAuction[]> {
    let auctioningProduct = await this.getAuctioningProduct();
    
    const result = auctioningProduct.filter(aP => {
      return aP.Product_ID.Catalog_ID.Catalog_Name.toLowerCase().includes(Catalog_Name.toLowerCase())
    })

    return result;
  }

  async searchAuctioningProduct(Product_Name: string)
  : Promise<ProductAuction[]> {
    let auctioningProduct = await this.getAuctioningProduct();

    const result = auctioningProduct.filter(aP => {
      return aP.Product_ID.Product_Name.toLowerCase().includes(Product_Name.toLowerCase()) ||
      aP.Product_ID.Catalog_ID.Catalog_Name.toLowerCase().includes(Product_Name.toLowerCase())
    });

    return result;
  }

  async getProducByAuctioning(Product_Auction_ID: string)
  : Promise<Product> {
    const result = await this.getProductAuctionById(Product_Auction_ID);

    return result.Product_ID;
  }

  async getSimilarProductAuctioning(Product_Auction_ID: string)
  : Promise<ProductAuction[]> {
    const productAuction = await this.getProductAuctionById(Product_Auction_ID);

    let onField = await this.auctionFieldService.getAuctionFieldById(productAuction.Auction_Field_ID.Auction_Field_ID);
    const result = onField.Product_Auction.filter(pA => pA.Product_Auction_ID !== Product_Auction_ID)

    return result;
  }

  async getFieldAuctioning(Product_Auction_ID: string)
  : Promise<AuctionField> {
    const result = await this.getProductAuctionById(Product_Auction_ID);

    return result.Auction_Field_ID;
  }

  async creatProductAuctionLog(price: number, productAuction: ProductAuction) {
    const newAuctionLog = new ProductAuctionLog();
    newAuctionLog.Price = price;
    newAuctionLog.Time = new Date();
    newAuctionLog.Product_Auction_ID = productAuction;
    await this.productAuctionLogService.create(newAuctionLog);
  }

  async productDiscount(Product_Auction: ProductAuction)
  : Promise<ProductAuction> {
    let { Current_Price, Discount_Rate } = Product_Auction;
    Current_Price = Current_Price - (Current_Price * (Discount_Rate/100));
    Product_Auction.Current_Price = Current_Price;

    return await this.productAuctionRepository.save(Product_Auction);
  }
}
