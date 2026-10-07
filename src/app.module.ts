import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { forwardRef } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
  ConfigModule.forRoot(),
  ThrottlerModule.forRoot({
    ttl:60,
    limit:100,
  }),
  forwardRef(() => UserModule),
  forwardRef(() =>AuthModule)],
  controllers: [AppController],
  providers: [AppService,{

    provide: APP_GUARD,
    useClass: ThrottlerGuard

  }],
})
export class AppModule {}
