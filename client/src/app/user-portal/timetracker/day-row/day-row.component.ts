import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Maybe, WorkdayData } from "@shared/custom/types";
import { Workday } from "@shared/models/workday.model";
import * as moment from "moment";
import { Moment } from "moment";
import { BehaviorSubject, Observer, Subscription } from "rxjs";
import { DateTimeUtilsService } from "src/app/services/utils/date-time-utils.service";
import { DayRecord } from "../timetracker.component";
import { KeyValue } from "@angular/common";
import { TimeSpan } from "@shared/custom/timeSpan";

@Component({
	selector: "tr[app-day-row]",
	templateUrl: "./day-row.component.html",
	styleUrls: ["./day-row.component.scss"],
})
export class DayRowComponent implements OnInit, OnDestroy {
	@Input() dayRecord: DayRecord | undefined;

	@Output() rowForm: EventEmitter<FormArray> = new EventEmitter();
	@Output() timeChanges: EventEmitter<KeyValue<Moment, moment.Duration>> = new EventEmitter();
	@Output() workday: EventEmitter<KeyValue<Moment, Partial<WorkdayData>>> = new EventEmitter();

	startForm: FormControl<string>;
	endForm: FormControl<string>;
	breakForm: FormControl<string>;
	noteForm: FormControl<string>;
	workingTime: string = "";

	private startTime = new BehaviorSubject<Maybe<moment.Duration>>(undefined);
	private endTime = new BehaviorSubject<Maybe<moment.Duration>>(undefined);
	private breakTime = new BehaviorSubject<Maybe<moment.Duration>>(undefined);
	private note = new BehaviorSubject<Maybe<string>>(undefined);
	private form: FormArray;
	private subscriptions: Subscription = new Subscription();

	constructor(private dateUtil: DateTimeUtilsService) {
		this.startForm = new FormControl();
		this.endForm = new FormControl();
		this.breakForm = new FormControl();
		this.noteForm = new FormControl();
		this.form = new FormArray([this.startForm, this.endForm, this.breakForm, this.noteForm]);
	}

	ngOnInit(): void {
		this.subscripeValues();
		this.subscripeForms();
		this.initFormValues(this.dayRecord?.data.getValue());
		this.rowForm.emit(this.form);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	getWeekday(date: Moment): string {
		date.locale("de");
		return date.format("dd");
	}

	formatDate(date: Moment): string {
		date.locale("de");
		return date.format("DD.MM.YYYY");
	}

	private initFormValues(workday: Workday | undefined): void {
		if (workday) {
			this.startForm.setValue(this.getTimeFromDate(workday.start));
			this.endForm.setValue(this.getTimeFromDate(workday.end));
			if (workday.break) {
				this.breakForm.setValue(this.getTimeFromDate(this.dateUtil.timespanToDate(workday.break)));
			} else {
				this.breakForm.setValue("");
			}
			this.noteForm.setValue(workday.note || "");
		}
		this.startForm.markAsUntouched();
		this.endForm.markAsUntouched();
		this.breakForm.markAsUntouched();
		this.noteForm.markAsUntouched();
		this.form.markAsUntouched();
	}

	private subscripeValues() {
		const onTimeChange: Partial<Observer<any>> = {
			next: (val) => {
				this.calculateWorkingTime();
			},
		};
		const updateWorkday: Partial<Observer<any>> = {
			next: (val) => {
				this.updateWorkday();
			},
		};
		this.subscriptions.add(this.startTime.subscribe(onTimeChange));
		this.subscriptions.add(this.endTime.subscribe(onTimeChange));
		this.subscriptions.add(this.breakTime.subscribe(onTimeChange));
		this.subscriptions.add(this.note.subscribe(updateWorkday));
		this.subscriptions.add(this.dayRecord?.data.subscribe({ next: (workday) => this.initFormValues(workday) }));
	}

	private subscripeForms() {
		this.subscriptions.add(
			this.startForm.valueChanges.subscribe({
				next: (val) => {
					this.startTime.next(moment.duration(val));
				},
			})
		);
		this.subscriptions.add(
			this.endForm.valueChanges.subscribe({
				next: (val) => {
					this.endTime.next(moment.duration(val));
				},
			})
		);
		this.subscriptions.add(
			this.breakForm.valueChanges.subscribe({
				next: (val) => {
					this.breakTime.next(moment.duration(val));
				},
			})
		);
	}

	private calculateWorkingTime() {
		let newWorkingTime: moment.Duration;
		const start = this.startTime.getValue()?.clone();
		const end = this.endTime.getValue()?.clone();
		const breakTime = this.breakTime.getValue()?.clone();
		if (!start || !end) {
			newWorkingTime = moment.duration(0);
		} else {
			if (breakTime) {
				newWorkingTime = end.subtract(start).subtract(breakTime);
			} else {
				newWorkingTime = end.subtract(start);
			}
		}
		if (newWorkingTime.asMinutes() < 0) {
			newWorkingTime = moment.duration(0);
			this.workingTime = "Ungültige Zeit, bitte Eingabe prüfen!";
		} else {
			this.workingTime = this.dateUtil.formatDurationAsTime(newWorkingTime);
		}
		if (!this.dayRecord?.day) {
			console.error("no day to report time");
		} else {
			this.timeChanges.next({
				key: this.dayRecord.day,
				value: newWorkingTime,
			});
			this.updateWorkday();
		}
	}

	private updateWorkday() {
		if (!this.dayRecord?.day) {
			throw new Error("no day to report time");
		}
		this.workday.next({
			key: this.dayRecord.day,
			value: {
				start: this.dateFromTime(this.startTime.getValue()),
				end: this.dateFromTime(this.endTime.getValue()),
				break: new TimeSpan(this.breakTime.getValue()?.hours() || 0, this.breakTime.getValue()?.minutes() || 0),
				note: this.noteForm.value,
			},
		});
	}

	private getTimeFromDate(date: Date): string {
		if (!date) {
			return "00:00";
		}
		return moment(date).format("HH:mm");
	}

	private dateFromTime(time: moment.Duration | undefined): Date {
		if(!this.dayRecord?.day) {
			throw new Error("missing dayRecord?.day");
		}
		if (!time) {
			time = moment.duration(0);
		}
		return moment(this.dayRecord.day).set('hours', 0).set('minutes', 0).add(time).toDate();
	}
}
