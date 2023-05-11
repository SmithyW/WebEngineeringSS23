import { Component, OnDestroy, OnInit } from "@angular/core";
import { Duration, Moment } from "moment";
import { DateTimeUtilsService, Month } from "src/app/services/utils/date-time-utils.service";
import { IWorkday } from "@shared/models/workday.model";
import { RestService } from "src/app/services/rest/rest.service";
import { Subscription } from "rxjs";
import * as moment from 'moment';

moment.locale('de');

@Component({
	selector: "app-timetracker",
	templateUrl: "./timetracker.component.html",
	styleUrls: ["./timetracker.component.scss"],
})
export class TimetrackerComponent implements OnInit, OnDestroy {
	data: DayRecord[] = [];

	private dates: Moment[] = [];
	private currentMonth: Month;
	private currentYear: number;
	private subscriptions = new Subscription();

	constructor(private dateTimeUtil: DateTimeUtilsService, private rest: RestService) {
		this.currentMonth = this.dateTimeUtil.getCurrentMonth();
		this.currentYear = new Date().getFullYear();
	}

	ngOnInit(): void {
		this.setMonth();
		this.fetchWorkdays();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

  formatDate(date: Moment): string {
    date.locale("de");
    return date.format("dd DD.MM.YYYY");
  }

	private fetchWorkdays(): void {
		const workdaySubscription = this.rest.fetchWorkdays(Month.MAY).subscribe({
			next: (workdayData) => {
				console.log("Get workdays:", workdayData);
			},
			error: (err) => {
				console.error("Error while fetching workdays", err);
			},
			complete: () => {
				console.info("fetching workdays completed");
			},
		});
		this.subscriptions.add(workdaySubscription);
	}

	private setMonth(): void {
		this.dates = this.dateTimeUtil.getDaysInMonth(this.currentMonth, this.currentYear);
		this.data = [];
		this.dates.forEach((day) => {
			const record: DayRecord = {
				day: day,
				workStart: undefined,
				workEnd: undefined,
				breaksDuration: undefined,
				workingDuration: undefined,
				plannedWorkingDuration: undefined,
				differenceDuration: undefined,
				comments: "",
			};
			this.data.push(record);
		});
	}
}

export interface DayRecord {
	day: Moment;
	workStart: Date | undefined;
	workEnd: Date | undefined;
	breaksDuration: undefined;
	workingDuration: Duration | undefined;
	plannedWorkingDuration: Duration | undefined;
	differenceDuration: Duration | undefined;
	comments: String;
}
