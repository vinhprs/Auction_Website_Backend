import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { formatTime } from '../utils/date.util';
import { AuctionFieldService } from '../modules/auction-field/auction-field.service';
import { AuctionField } from '../modules/auction-field/entities/auction-field.entity';
import { CronJob } from 'cron';
import { ProductAuctionService } from '../modules/product-auction/product-auction.service';
import { UserBidService } from '../modules/user-bid/user-bid.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly auctionFieldService: AuctionFieldService,
    private readonly productAuctionService: ProductAuctionService,
    private readonly userBidService: UserBidService,
  ) {}
  
  @Cron('30 12 0 * * *')
  async fieldOperating() {
    let auctionField = await this.auctionFieldService.getAll();
    const now = new Date(Date.now())
    const sameDateAuction = auctionField.filter(a => 
      a.Start_Time.getFullYear() === now.getFullYear() &&
      a.Start_Time.getMonth() === now.getMonth() &&
      a.Start_Time.getDate() === now.getDate()
    );

    sameDateAuction.forEach(async (a) => {
      const { hour, minute, second } = formatTime(a.Start_Time);
      const endTime = a.End_Time;

      await Promise.all([
        this.auctionOperate(a, hour, minute, second),
        this.stopAuctionField(a, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
      ]);
    });
  }

  @Interval(60*1000)
  async discountInterval() {
    let auctionField = await this.auctionFieldService.getAll();
    const now = new Date(Date.now())
    const sameDateAuction = auctionField.filter(a => 
      a.Start_Time.getFullYear() === now.getFullYear() &&
      a.Start_Time.getMonth() === now.getMonth() &&
      a.Start_Time.getDate() === now.getDate()
    );
   
    sameDateAuction.forEach((a) => {
      // next discount base on discount cycle
      let nextDiscount = new Date();
      nextDiscount.setMinutes(nextDiscount.getMinutes() + a.Discount_Circle);
      a.Product_Auction.forEach(async (pA) => {
        if(pA.isSold === false) {
          await Promise.all([
            this.discountProduct(pA.Product_Auction_ID, nextDiscount),
            this.userBidService.getBidWinner(pA.Product_Auction_ID)
          ])
        }
        else {
          pA.isSold = true;
          await this.productAuctionService.updateSold(pA)
        }
      });
    })
  }

  async auctionOperate(auctionField: AuctionField , hour: number, 
    minute: number, second: number) {
    const job = new CronJob(`${second} ${minute} ${hour} * * *`,async () => {
      await this.auctionFieldService.setOperation(auctionField)
    });

    job.start();
  }

  async stopAuctionField(auctionField: AuctionField, hour: number,
    minute: number, second: number) : Promise<void> {
      const job = new CronJob(`${second} ${minute} ${hour} * * *`, async() => {
        await this.auctionFieldService.stopOperating(auctionField)
      });
    
      job.start();
    }

  async discountProduct(Product_Auction_ID: string ,nextDiscount: Date) : Promise<void> {
    const { hour, minute, second } = formatTime(nextDiscount);
    const job = new CronJob(`${second} ${minute} ${hour} * * *`, async() => {
      await this.productAuctionService.productDiscount(Product_Auction_ID)
    });

    job.start();
  }

}


