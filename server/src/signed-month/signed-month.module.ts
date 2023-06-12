import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignedMonth, SignedMonthSchema } from '@shared/models/signed-month.model';
import { SignedMonthService } from './signed-month.service';
import { SignedMonthController } from './signed-month.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: SignedMonth.name, schema: SignedMonthSchema }])],
  controllers: [SignedMonthController],
  providers: [SignedMonthService],
  exports: [SignedMonthService]
})
export class SignedMonthModule {}
