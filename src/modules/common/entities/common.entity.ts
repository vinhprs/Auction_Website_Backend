import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";

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

    // @Field()
    // 'h:X-Mailgun-Variables': { test: string };
}