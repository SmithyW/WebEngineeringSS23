import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkdayService } from './workday.service';
import { WorkdayController } from './workday.controller';
import { Workday, WorkdaySchema } from '@shared/models/workday.model';
import { SignedMonthModule } from 'src/signed-month/signed-month.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Workday.name, schema: WorkdaySchema }]), SignedMonthModule],
  controllers: [WorkdayController],
  providers: [WorkdayService]
})
export class WorkdayModule {}
