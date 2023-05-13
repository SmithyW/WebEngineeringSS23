import { Component, Input } from '@angular/core';
import { DayRecord } from '../timetracker.component';
import { Moment } from 'moment';

@Component({
  selector: 'tr[app-disabled-day-row]',
  templateUrl: './disabled-day-row.component.html',
  styleUrls: ['./disabled-day-row.component.scss']
})
export class DisabledDayRowComponent {
  @Input() dayRecord: DayRecord | undefined;
  @Input() note: string | undefined;

  getWeekday(date: Moment): string {
		date.locale("de");
		return date.format("dd");
	}

	formatDate(date: Moment): string {
		date.locale("de");
		return date.format("DD.MM.YYYY");
	}
}
