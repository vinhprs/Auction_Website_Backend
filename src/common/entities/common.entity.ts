import { Field, ObjectType } from "@nestjs/graphql";
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