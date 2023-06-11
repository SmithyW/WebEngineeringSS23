import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContractModule } from './contract/contract.module';
import { UserModule } from './user/user.module';
import { WorkdayModule } from './workday/workday.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SignedMonthModule } from './signed-month/signed-month.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}?authSource=${process.env.DB_AUTH_SOURCE}`,
    {
      dbName: process.env.DB_NAME
    }),
    ContractModule,
    UserModule,
    WorkdayModule,
    SignedMonthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
