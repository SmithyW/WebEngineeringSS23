import { Component, OnDestroy, OnInit } from "@angular/core";
import { Moment } from "moment";
import { DateTimeUtilsService } from "src/app/services/utils/date-time-utils.service";
import { RestService } from "src/app/services/rest/rest.service";
import { BehaviorSubject, Subscription, windowTime } from "rxjs";
import * as moment from "moment";
import { ContractData, Maybe, WorkdayData } from "@shared/custom/types";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { AbstractControl } from "@angular/forms";
import { Month } from "@shared/enums/month.enum";
import { KeyValue } from "@angular/common";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { WorkdaySaveService } from "./day-row/workday-save.service";

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
	readonly FUTURE = DayType.FUTURE;

	readonly TODAY = new Date(new Date().setHours(0, 0, 0, 0));
	data: DayRecord[] = [];
	forms: FormArray<AbstractControl> = new FormArray<AbstractControl>([]);
	dateForm: FormGroup | undefined;
	currentMonth: Month;
	currentYear: number;
	yearSelect: number;
	contract: Maybe<ContractData> = {
		_id: "",
		begin: new Date(2023, 3, 1),
		end: new Date(2023, 6, 15),
		timePerWeekday: [
			{
				time: 4,
				weekday: 2,
			},
		],
		user: "userId",
		weeklyTime: 10,
	};
	monthSum: string = "";
	isSignedMonth: boolean = false;

	readonly months = Month;

	private dataMap: Map<number, DayRecord> = new Map();
	private timeMap: Map<Moment, moment.Duration> = new Map();
	private workdayMap: Map<number, Partial<WorkdayData>> = new Map();
	private dates: Moment[] = [];
	private subscriptions = new Subscription();

	constructor(
		private dateTimeUtil: DateTimeUtilsService,
		private rest: RestService,
		private authService: AuthenticationService,
		private saveService: WorkdaySaveService
	) {
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
		this.monthSum = this.calculateMonthSum();
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	getMonthName(month: Month, short = true): string {
		return this.dateTimeUtil.getMounthName(month, short);
	}

	getDayType(day: Moment): DayType {
		if (this.dateTimeUtil.isGermanHolidayNRW(day, ["NW"])) {
			return DayType.HOLIDAY;
		} else if (this.dateTimeUtil.isWeekend(day)) {
			return DayType.WEEKEND;
		} else if (moment(day).toDate() > this.TODAY) {
			return DayType.FUTURE;
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

	updateTime(timeRecord: KeyValue<Moment, moment.Duration>) {
		this.timeMap.set(timeRecord.key, timeRecord.value);
		this.monthSum = this.calculateMonthSum();
	}

	updateWorkday(workday: KeyValue<Moment, Partial<WorkdayData>>) {
		this.workdayMap.set(this.getIndexFromDate(workday.key), workday.value);
	}

	save() {
		this.saveService.trigger();
	}

	sign() {
		const signWorkdaysSubscription = this.rest.signWorkdays(this.currentMonth, this.currentYear).subscribe({
			next: (response) => {
				console.log(response);
			},
			error: (error) => {
				console.log(error);
			},
		});
	}

	isMonthCompleted(): boolean {
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

	private calculateMonthSum(): string {
		let timeSum: moment.Duration = moment.duration(0);
		if (this.timeMap.size > 0) {
			this.timeMap.forEach((value, key) => {
				if (value) {
					timeSum.add(value);
				}
			});
		}
		const hours = Math.floor(timeSum.asHours());
		const minutes = (timeSum.asHours() % 1) * 60;
		return (
			hours.toLocaleString(undefined, {
				maximumFractionDigits: 0
			}) +
			":" +
			minutes.toLocaleString(undefined, {
				maximumFractionDigits: 0,
				minimumIntegerDigits: 2,
			})
		);
	}

	private fetchWorkdays(): void {
		const workdaySubscription = this.rest.fetchWorkdays(this.currentMonth, this.currentYear).subscribe({
			next: (response) => {
				console.log("workdays", response);
				response.data?.forEach((workday) => {
					workday.start = this.dateTimeUtil.ensureDate(workday.start);
					workday.end = this.dateTimeUtil.ensureDate(workday.end);
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
		this.timeMap.clear();
		this.forms.clear();
		this.dates = this.dateTimeUtil.getDaysInMonth(month, year);
		this.data = [];
		this.dataMap.clear();
		this.dates.forEach((day) => {
			const record: DayRecord = {
				day: day,
				data: new BehaviorSubject<Maybe<WorkdayData>>(undefined),
				workingTime: undefined,
			};
			this.dataMap.set(this.getIndexFromDate(record.day), record);
		});
		this.data = Array.from(this.dataMap.values());
		this.fetchContract();
		const signedMonthSubscription = this.rest.fetchSignedMonths(month, year).subscribe({
			next: response => {
				this.isSignedMonth = response.data?.length > 0;
			},
			error: error => console.error("error while fetching signed month", error)
		});
		this.subscriptions.add(signedMonthSubscription);
	}

	private fetchContract(): void {
		const contractSubscription = this.rest.fetchContract(this.currentMonth, this.currentYear).subscribe({
			next: (response) => {
				this.contract = response.data;
			},
			error: (err) => {
				console.error("Error while fetching contract", err);
			},
		});
		this.subscriptions.add(contractSubscription);
	}

	private getIndexFromDate(date: Moment): number {
		const key = date.format("YYYYMMDD");
		const index = new Number(key);
		return index.valueOf();
	}
}

export type DayRecord = {
	day: Moment;
	data: BehaviorSubject<Maybe<WorkdayData>>;
	workingTime: Maybe<moment.Duration>;
};

enum DayType {
	WORKDAY,
	WEEKEND,
	HOLIDAY,
	FUTURE,
}
