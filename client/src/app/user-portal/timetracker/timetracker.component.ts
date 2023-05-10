import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { DateTimeUtilsService, Month } from 'src/app/services/utils/date-time-utils.service';

@Component({
  selector: 'app-timetracker',
  templateUrl: './timetracker.component.html',
  styleUrls: ['./timetracker.component.scss']
})
export class TimetrackerComponent implements OnInit {

  timeRecords: DayRecord[] = [];

  data = [];
  month: Moment[] = [];

  private currentMonth: Month;
  private currentYear: number;

  constructor(
    private dateTimeUtil: DateTimeUtilsService
  ) {
    this.currentMonth = this.dateTimeUtil.getCurrentMonth();
    this.currentYear = new Date().getFullYear();
    this.month = dateTimeUtil.getDaysInMonth(this.currentMonth, this.currentYear);
  }

  ngOnInit(): void {
      
  }

  fetchTimedata() {

  }
}

export interface DayRecord {
  day: Date;
  workStart: Date;
  workEnd: Date;
  breaksDuration: Date;
  workingDuration: Date;
  plannedWorkingDuration: Date;
  differenceDuration: Date;
  comments: String;
}
