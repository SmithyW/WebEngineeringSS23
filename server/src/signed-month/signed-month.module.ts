import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignedMonth, SignedMonthSchema } from '@shared/models/signed-month.model';
import { SignedMonthService } from './signed-month.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SignedMonth.name, schema: SignedMonthSchema }])],
  controllers: [],
  providers: [SignedMonthService],
  exports: [SignedMonthService]
})
export class SignedMonthModule {}
