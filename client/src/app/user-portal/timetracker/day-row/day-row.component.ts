import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Maybe } from "@shared/custom/types";
import { Workday } from "@shared/models/workday.model";
import * as moment from "moment";
import { Moment } from "moment";
import { BehaviorSubject, Observer, Subscription } from "rxjs";
import { DateTimeUtilsService } from "src/app/services/utils/date-time-utils.service";
import { DayRecord } from "../timetracker.component";
import { KeyValue } from "@angular/common";

@Component({
	selector: "tr[app-day-row]",
	templateUrl: "./day-row.component.html",
	styleUrls: ["./day-row.component.scss"],
})
export class DayRowComponent implements OnInit, OnDestroy {
	@Input() dayRecord: DayRecord | undefined;

	@Output() rowForm: EventEmitter<FormArray> = new EventEmitter();
	@Output() timeChanges: EventEmitter<KeyValue<Moment, moment.Duration>> = new EventEmitter();

	startForm: FormControl<string>;
	endForm: FormControl<string>;
	breakForm: FormControl<string>;
	noteForm: FormControl<string>;
	workingTime: string = "";

	private startTime = new BehaviorSubject<Maybe<moment.Duration>>(undefined);
	private endTime = new BehaviorSubject<Maybe<moment.Duration>>(undefined);
	private breakTime = new BehaviorSubject<Maybe<moment.Duration>>(undefined);
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
			this.breakForm.setValue(this.getTimeFromDate(this.dateUtil.timespanToDate(workday.break)));
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
		this.subscriptions.add(this.startTime.subscribe(onTimeChange));
		this.subscriptions.add(this.endTime.subscribe(onTimeChange));
		this.subscriptions.add(this.breakTime.subscribe(onTimeChange));
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
			console.error('no day to report time');
		} else {
			this.timeChanges.next({
				key: this.dayRecord.day,
				value: newWorkingTime
			});
		}
	}

	private getTimeFromDate(date: Date): string {
		if (!date) {
			return "00:00";
		}
		return moment(date).format("HH:mm");
	}
}
