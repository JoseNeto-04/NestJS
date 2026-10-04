import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
  forwardRef(() => UserModule),
  forwardRef(() =>AuthModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
