import { Component, OnDestroy, OnInit } from "@angular/core";
import { Moment } from "moment";
import { DateTimeUtilsService, Month } from "src/app/services/utils/date-time-utils.service";
import { Workday } from "@shared/models/workday.model";
import { RestService } from "src/app/services/rest/rest.service";
import { BehaviorSubject, Subscription } from "rxjs";
import * as moment from "moment";
import { Maybe } from "@shared/custom/types";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

moment.locale("de");

@Component({
	selector: "app-timetracker",
	templateUrl: "./timetracker.component.html",
	styleUrls: ["./timetracker.component.scss"],
})
export class TimetrackerComponent implements OnInit, OnDestroy {
	readonly HOLIDAY = DayType.HOLIDAY;
	readonly WEEKEND = DayType.WEEKEND;
	readonly WORKDAY = DayType.WORKDAY;

	data: DayRecord[] = [];
	forms: FormArray<AbstractControl> = new FormArray<AbstractControl>([]);
	dateForm: FormGroup | undefined;
	currentMonth: Month;
	currentYear: number;
	yearSelect: number;
	
	readonly months = Month;

	private dataMap: Map<number, DayRecord> = new Map();

	private dates: Moment[] = [];
	private subscriptions = new Subscription();

	constructor(private dateTimeUtil: DateTimeUtilsService, private rest: RestService) {
		this.currentMonth = this.dateTimeUtil.getCurrentMonth();
		this.currentYear = new Date().getFullYear();
		this.yearSelect = this.currentYear;
	}

	ngOnInit(): void {
		this.setMonth();
		this.fetchWorkdays();
		this.dateForm = new FormGroup({
			CalMonth: new FormControl(moment()),
		  }); 
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	getMounthName(month: Month): string {
		return this.dateTimeUtil.getMounthName(month, true);
	}

	getDayType(day: Moment): DayType {
		if (this.dateTimeUtil.isGermanHolidayNRW(day, ["NW"])) {
			return DayType.HOLIDAY;
		} else if (this.dateTimeUtil.isWeekend(day)) {
			return DayType.WEEKEND;
		} else {
			return DayType.WORKDAY;
		}
	}

	getHolidayName(day: Moment): string {
		return this.dateTimeUtil.getGermanHolidayName(day, ["NW"]);
	}

	addRowForm(form: FormArray): void {
		this.forms.push(form);
	}

	save() {
		console.warn("TODO: save");
	}

	sign() {
		console.warn("TODO: sign");
	}

	isMonthCompleted(): boolean {
		console.warn("TODO: sign vor Monatsende, wenn Vertragsende früher");
		return this.dates[this.dates.length - 1].isBefore(moment.now());
	}

	decrementYearSelect(): void {
		this.yearSelect -= 1;
	}

	incrementYearSelect(): void {
		this.yearSelect += 1;
	}

	isMonthValid(month: Month): boolean {
		const now = new Date();
		if (this.yearSelect < now.getFullYear()) {
			return true;
		}
		if (this.yearSelect > now.getFullYear()) {
			return false;
		}
		return month <= this.dateTimeUtil.getCurrentMonth();
	}

	selectMonth(month: Month): void {
		this.currentYear = this.yearSelect;
		this.currentMonth = month;
		this.setMonth(month, this.currentYear);
		this.fetchWorkdays();
	}

	private fetchWorkdays(): void {
		const workdaySubscription = this.rest.fetchWorkdays(Month.MAY).subscribe({
			next: (workdaysData) => {
				workdaysData.forEach((workday) => {
					const dayRecord = this.dataMap.get(this.getIndexFromDate(moment(workday.start)));
					if (dayRecord) {
						dayRecord.data.next(workday);
					}
				});
			},
			error: (err) => {
				console.error("Error while fetching workdays", err);
			},
		});
		this.subscriptions.add(workdaySubscription);
	}

	private setMonth(month: Month = this.currentMonth, year: number = this.currentYear): void {
		this.dates = this.dateTimeUtil.getDaysInMonth(month, year);
		this.data = [];
		this.dataMap.clear();
		this.dates.forEach((day) => {
			const record: DayRecord = {
				day: day,
				data: new BehaviorSubject<Maybe<Workday>>(undefined),
			};
			this.dataMap.set(this.getIndexFromDate(record.day), record);
		});
		this.data = Array.from(this.dataMap.values());
	}

	private getIndexFromDate(date: Moment): number {
		const key = date.format("YYYYMMDD");
		const index = new Number(key);
		return index.valueOf();
	}
}

export type DayRecord = {
	day: Moment;
	data: BehaviorSubject<Maybe<Workday>>;
};

enum DayType {
	WORKDAY,
	WEEKEND,
	HOLIDAY,
}
