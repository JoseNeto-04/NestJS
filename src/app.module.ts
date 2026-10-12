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
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'



@Module({
  imports: [
  ConfigModule.forRoot(),
  ThrottlerModule.forRoot({
    ttl:60,
    limit:100,
  }),

  forwardRef(() => UserModule),
  forwardRef(() =>AuthModule),
 MailerModule.forRoot({
  transport: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'margot37@ethereal.email',
      pass:'SryjHZrR3wbggBx73y',
    },
  },

  defaults: {
    from: '"VonexXTStore" <ellis.kutch85@ethereal.email>',
  },

    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
      strict: true,
      },
    },
  }),
],

  controllers: [AppController],
  providers: [AppService,{

    provide: APP_GUARD,
    useClass: ThrottlerGuard

  }],
})
export class AppModule {}
