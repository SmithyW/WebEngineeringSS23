import { Injectable } from '@angular/core';
import * as dateUtils from '@wojtekmaj/date-utils';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { extendMoment } from 'moment-range';

@Injectable({
  providedIn: 'root'
})
export class DateTimeUtilsService {

  readonly moment = extendMoment(_moment);

  public getCurrentMonth(): Month {
    const m = dateUtils.getMonth(new Date());
    return this.getMonth(m);
  }

  public getDaysInMonth(month: Month, year: number): Moment[] {
    const now = new Date(year, month, 1);
    const monthStart = dateUtils.getMonthStart(now);
    const days = dateUtils.getDaysInMonth(now);
    const monthRange = this.moment.rangeFromInterval('day', days, monthStart);
    return Array.from(monthRange.by('day', {excludeEnd: true, step: 1}));
  }

  private getMonth(num: number): Month {
    switch(num) {
      case 0:
        return Month.JANUARY;
      case 1:
        return Month.FEBRUARY;
      case 2:
        return Month.MARCH;
      case 3:
        return Month.APRIL;
      case 4:
        return Month.MAY;
      case 5:
        return Month.JUNE;
      case 6:
        return Month.JULY;
      case 7:
        return Month.AUGUST;
      case 8:
        return Month.SEPTEMBER;
      case 9:
        return Month.OCTOBER;
      case 10:
        return Month.NOVEMBER;
      case 11:
        return Month.DECEMBER;
      default:
        throw new Error(`Illegal number for month: ${num}`);
    }
  }
}

export enum Month {
  JANUARY = 0,
  FEBRUARY = 1,
  MARCH = 2,
  APRIL = 3,
  MAY = 4,
  JUNE = 5,
  JULY = 6,
  AUGUST = 7,
  SEPTEMBER = 8,
  OCTOBER = 9,
  NOVEMBER = 10,
  DECEMBER = 11,
}