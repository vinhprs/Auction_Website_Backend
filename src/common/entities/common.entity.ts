import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Address } from "src/modules/address/entities/address.entity";
import { AuctionField } from "src/modules/auction-field/entities/auction-field.entity";
import { ProductAuction } from "src/modules/product-auction/entities/product-auction.entity";
import { Stream } from "stream";
import { User } from "../../modules/user/entities/user.entity";

@ObjectType()
export class IJwtPayload {
    @Field({ nullable: true })
    id: string;
}

@ObjectType()
export class JwtPayload {
    @Field({ nullable: true })
    accessToken: string;

    @Field(() => IJwtPayload, { nullable: true })
    userId: IJwtPayload;

    @Field(() => User, {nullable: true})
    userInfo: User
}

@ObjectType()
export class SendEmailData {
    @Field()
    from: string;

    @Field()
    to: string;

    @Field()
    subject: string;

    @Field()
    template: string;
}

@ObjectType()
export class TotalOrderResult {
    @Field(() => Float, {nullable: true, defaultValue: 0})
    total: number;
    @Field(() => Float, {nullable: true, defaultValue: 0})
    weight: number;
    @Field(() => Address, {nullable: true, defaultValue: null})
    Address_ID: Address
}

@ObjectType()
export class AdminProductResult {
    @Field(() => Int, {nullable: true, defaultValue: 0})
    totalProduct: number;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    ordered: number;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    sold: number;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    selling: number;
}

@ObjectType()
export class FieldProductCountResult {
    @Field(() => AuctionField, {nullable: true, defaultValue: 0})
    Aution_Field: AuctionField;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    totalProduct: number;
}


export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}

export interface Product_Auction_Operating {
    Product_Auction: ProductAuction[];
    isOperation: boolean[];
}
