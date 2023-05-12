import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract, ContractSchema } from '@shared/models/contract.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contract.name, schema: ContractSchema }])],
  controllers: [ContractController],
  providers: [ContractService]
})
export class ContractModule {}
