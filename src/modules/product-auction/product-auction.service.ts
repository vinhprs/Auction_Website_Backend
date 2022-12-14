import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionFieldService } from '../auction-field/auction-field.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CreateProductAuctionInput } from './dto/create-product-auction.input';
import { ProductAuction } from './entities/product-auction.entity';
import e, { Request } from 'express';
import { getUserIdFromRequest } from 'src/utils/user-from-header.util';
import { ProductAuctionLogService } from '../product-auction-log/product-auction-log.service';
import { ProductAuctionLog } from '../product-auction-log/entities/product-auction-log.entity';
import { Product } from '../product/entities/product.entity';
import { AuctionField } from '../auction-field/entities/auction-field.entity';
import { User } from '../user/entities/user.entity';
import { AdminProductResult, FieldProductCountResult } from 'src/common/entities/common.entity';

@Injectable()
export class ProductAuctionService {
  
  constructor(
    @InjectRepository(ProductAuction)
    private readonly productAuctionRepository: Repository<ProductAuction>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly auctionFieldService: AuctionFieldService,
    private readonly productAuctionLogService: ProductAuctionLogService,
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
      result = p.Product_Auction.filter(pA => pA.isSold == false)
    });
    return result;
  }

  async getAuctioningProductByCatalog(Catalog_Name: string)
  : Promise<ProductAuction[]> {
    
    let auctioningProduct  = await this.getAuctioningProduct()

    if(Catalog_Name.toLowerCase() === 'seafood') {
      Catalog_Name = 'fish crab shrimp'
    } else if(Catalog_Name.toLowerCase() === 'vegatables') {
      Catalog_Name = 'cruciferous mushroom edible plant stem'
    } else if(Catalog_Name.toLowerCase() === 'meat') {
      Catalog_Name = 'beef goat meat'
    } else if(Catalog_Name.toLowerCase() === 'fruit') {
      Catalog_Name = 'mango orange'
    }

    const result = auctioningProduct.filter(aP => 
      Catalog_Name.toLowerCase().includes(aP.Product_ID.Catalog_ID.Catalog_Name.toLowerCase())
    )

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

  async getAuctioningOwner(Product_Auction_ID: string)
  : Promise<User> {
    const result = await this.getProductAuctionById(Product_Auction_ID);

    return result.User_ID;
  }

  async creatProductAuctionLog(price: number, productAuction: ProductAuction) {
    const newAuctionLog = new ProductAuctionLog();
    newAuctionLog.Price = price;
    newAuctionLog.Time = new Date();
    newAuctionLog.Product_Auction_ID = productAuction;
    await this.productAuctionLogService.create(newAuctionLog);
  }

  async productDiscount(Product_Auction_ID: string)
  : Promise<void> {
    const Product_Auction = await this.getProductAuctionById(Product_Auction_ID);
    if(Product_Auction.isSold) {
      return;
    }
    console.log(Product_Auction.isSold)
    let { Current_Price, Discount_Rate } = Product_Auction;
    Current_Price = Current_Price - (Current_Price * (Discount_Rate/100));
    Product_Auction.Current_Price = Current_Price;

    await Promise.all([
      this.productAuctionRepository.save(Product_Auction),
      this.creatProductAuctionLog(Current_Price, Product_Auction)
    ]);
  }

  async updateSold(productAuction: ProductAuction)
  : Promise<ProductAuction> {
    productAuction.isSold = true;

    return await this.productAuctionRepository.save(productAuction);
  }

  async getAll() : Promise<ProductAuction[]> 
  {
    return await this.productAuctionRepository.find();
  }

  async findSold() : Promise<ProductAuction[]>
  {
    const result =  await this.productAuctionRepository.find({
      relations: { Order: true },
      where: {
        Order: {
          Status: true,
        }
      }
    })
    return result;
  }

  async findUnPaid() : Promise<ProductAuction[]>
  {
    const result =  await this.productAuctionRepository.find({
      relations: { Order: true },
      where: {
        Order: {
          Status: false,
        },
        isSold: true
      }
    })
    return result;
  }

  async getAdminProductCount()
  : Promise<AdminProductResult> {
    let adminResult = new AdminProductResult();
    adminResult.totalProduct = 0;

    const auctionField = await this.auctionFieldService.getOperatingAuctionField();
    auctionField.forEach(a => {
      adminResult.totalProduct += a.Product_Auction.length;
    });
    let productAuction = await this.getAll();
    adminResult.ordered = productAuction.filter(p => p.isSold == true).length;
    adminResult.sold = (await this.findSold()).length;
    adminResult.selling = (await this.findUnPaid()).length;
    return adminResult;
  }

  async getAdminProductInfo()
  :Promise<ProductAuction[]> {
    let result: ProductAuction[] = [];

    const [ productAuction, orderedProduct, soldProduct ]  = await Promise.all([
      this.getAll(),
      this.findUnPaid(),
      this.findSold()
    ]) 
    this.setStatus(orderedProduct, "Ordered");
    this.setStatus(soldProduct, "Sold out");
    const sellingProduct = productAuction.filter(p => p.isSold === false)
    this.setStatus(sellingProduct, "Selling");
    result = result.concat(orderedProduct, soldProduct, sellingProduct);

    return result;
  }

  setStatus(productAuction: ProductAuction[], value: string)
  : void {
    productAuction.forEach(p => p.status = value);
  }

  async getFieldProductCount() 
  : Promise<AuctionField[]> {
    let result: AuctionField[] = [];
    const auctionField = await this.auctionFieldService.getOperatingAuctionField();
    auctionField.forEach((a, index) => {
      result[index] = a,
      result[index].totalProduct = a.Product_Auction.length
    })
    return result;
  }

  async adminDashboardSales() : Promise<ProductAuction[]>
  {
    const result = await this.findSold();
    return result.filter(r => r.Order.Payment_ID);
  }

  async adminDashBoardAuction()
  : Promise<AuctionField[]> {
    return await this.auctionFieldService.getAll();
  }
}
