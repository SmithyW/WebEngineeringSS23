import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContractModule } from './contract/contract.module';
import { UserModule } from './user/user.module';
import { WorkdayModule } from './workday/workday.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ContractModule,
    UserModule,
    WorkdayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
