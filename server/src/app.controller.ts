import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IWorkday } from '@shared/models/workday.model';
import { TimeSpan } from '@shared/custom/timeSpan';
import { parse } from 'date-and-time';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:id/timetracking/:month')
  getWorkdaysForMonth(
    @Param('id') userId: string,
    @Param('month') month: string,
  ): IWorkday[] {
    console.warn('TODO: implement getWorkdaysForMonth');
    return [
      {
        _id: 'WD.1',
        start: parse('2023-05-09 09:00', 'YYYY-MM-DD HH:mm'),
        end: parse('2023-05-09 12:00', 'YYYY-MM-DD HH:mm'),
        break: new TimeSpan(0, 0),
        note: '-',
        user: 'userId',
      },
      {
        _id: 'WD.2',
        start: parse('2023-05-10 10:15', 'YYYY-MM-DD HH:mm'),
        end: parse('2023-05-10 15:45', 'YYYY-MM-DD HH:mm'),
        break: new TimeSpan(1, 30),
        note: '-',
        user: 'userId',
      },
    ];
  }
}
