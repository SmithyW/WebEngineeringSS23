import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [ConfigModule.forRoot(), ContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
