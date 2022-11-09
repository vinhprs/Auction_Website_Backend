import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
