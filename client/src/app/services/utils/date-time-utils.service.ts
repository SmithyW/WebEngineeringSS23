import { Injectable } from "@angular/core";
import { TimeSpan } from "@shared/custom/timeSpan";
import * as dateUtils from "@wojtekmaj/date-utils";
import { Moment } from "moment";
import { extendMoment } from "moment-range";
import * as dateAndTime from "date-and-time";
import * as _moment from "moment-feiertage";
import * as moment from "moment";
import { Month } from "@shared/enums/month.enum";

@Injectable({
	providedIn: "root",
})
export class DateTimeUtilsService {
	readonly moment = extendMoment(_moment);

	private language: string = "de";

	constructor() {
		moment.locale(this.language);
	}

	public setLanguage(language: string): void {
		this.language = language;
		moment.locale(this.language);
	}

	public getCurrentMonth(): Month {
		const m = dateUtils.getMonth(new Date());
		return this.getMonth(m);
	}

	public getDaysInMonth(month: Month, year: number): Moment[] {
		const now = new Date(year, month, 1);
		const monthStart = dateUtils.getMonthStart(now);
		const days = dateUtils.getDaysInMonth(now);
		const monthRange = this.moment.rangeFromInterval("day", days, monthStart);
		return Array.from(monthRange.by("day", { excludeEnd: true, step: 1 }));
	}

	public getMounthName(month: Month, short: boolean = false): string {
		let format = "MMMM";
		if (short) {
			format = "MMM";
		}
		return moment({ month: month }).format(format);
	}

	public timespanToDate(span: TimeSpan): Date {
		return _moment({
			hours: span.hours,
			minutes: span.minutes,
		}).toDate();
	}

	public ensureDate(date: Date | string): Date {
		if (date instanceof Date) {
			return date;
		}
		return moment(date).toDate();
	}

	public dateToTimespan(date: Date): TimeSpan {
		return new TimeSpan(date.getHours(), date.getMinutes());
	}

	public isWorkday(day: Moment, state: GermanState[]): boolean {
		return !this.isWeekend(day) && !this.isGermanHolidayNRW(day, state);
	}

	public isGermanHolidayNRW(day: Moment, state: GermanState[]): boolean {
		const holidayState = day.isHoliday(state);
		if (typeof holidayState === "boolean") {
			return holidayState;
		}
		if (typeof holidayState === "string") {
			return true;
		}
		return holidayState.allStates || holidayState.holidayStates.includes("NW");
	}

	public getGermanHolidayName(day: Moment, state: GermanState[]): string {
		const holidayState = day.isHoliday(state);
		if (typeof holidayState === "boolean") {
			return "unknown";
		}
		if (typeof holidayState === "string") {
			return holidayState;
		}
		return holidayState.holidayName;
	}

	public isWeekend(day: Moment): boolean {
		// Mon - Fri = 1...5, Sat = 6, Sun = 7
		return day.isoWeekday() > 5;
	}

	public formatDurationAsTime(duration: moment.Duration): string {
		return (
			duration.hours().toLocaleString("de", { minimumIntegerDigits: 2 }) +
			":" +
			duration.minutes().toLocaleString("de", { minimumIntegerDigits: 2 })
		);
	}

	public formatDate(date: Moment | Date | string, format: string = "DD.MM.YYYY"): string {
		if (date instanceof Date || typeof date === 'string'){
			date = moment(date);
		}
		date.locale("de");
		return date.format(format);
	}

	private getMonth(num: number): Month {
		switch (num) {
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

const AVAILABLE_REGIONS = (<T extends string[]>(...o: T) => o)(
	"BW",
	"BY",
	"BE",
	"BB",
	"HB",
	"HH",
	"HE",
	"MV",
	"NI",
	"NW",
	"RP",
	"SL",
	"SN",
	"ST",
	"SH",
	"TH"
);
export type GermanState = (typeof AVAILABLE_REGIONS)[number];
