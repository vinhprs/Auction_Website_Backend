import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../../common/entities/common.entity";
import { User } from "../../modules/user/entities/user.entity";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor( private readonly userService: UserService ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),                
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET
        });
    }

    async validate(payload: IJwtPayload) : Promise<User> {
        try {
            const user: User = await this.userService.getUserById(payload.id);
            if(!user || !user.isConfirmEmail) {
                throw new UnauthorizedException("Invalid token claims");
            }
            return user;
        } catch(e) {
            throw new UnauthorizedException(e);
        }
    }
}