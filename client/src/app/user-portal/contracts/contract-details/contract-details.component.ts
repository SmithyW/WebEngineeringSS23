import { WeekDay } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Route, ParamMap } from "@angular/router";
import { EWeekday } from "@shared/enums/weekday.enum";
import { ContractData } from "@shared/custom/types";
import { Observable, Subscription } from "rxjs";
import { RestService } from "src/app/services/rest/rest.service";
import { DateTimeUtilsService } from "src/app/services/utils/date-time-utils.service";

@Component({
	selector: "app-contract-details",
	templateUrl: "./contract-details.component.html",
	styleUrls: ["./contract-details.component.scss"],
})
export class ContractDetailsComponent implements OnInit, OnDestroy {
	contract: ContractData | undefined;
	formData: FormData[] = [];
  beginControl: FormControl = new FormControl();
  endControl: FormControl = new FormControl();
  supervisorControl: FormControl = new FormControl();
  timePerWeekdayArray : FormArray<FormGroup> = new FormArray<FormGroup>([], [Validators.minLength(1)]);
	error = false;
  form: FormGroup | undefined;
  isNew = false;

	private subscriptions = new Subscription();

  weekdays = [
    { text: 'Montag', value: EWeekday.MONDAY },
    { text: 'Dienstag', value: EWeekday.TUESDAY },
    { text: 'Mittwoch', value: EWeekday.WEDNESDAY },
    { text: 'Donnerstag', value: EWeekday.THURSDAY },
    { text: 'Freitag', value: EWeekday.FRIDAY },
    { text: 'Samstag', value: EWeekday.SATURDAY },
    { text: 'Sonntag', value: EWeekday.SUNDAY }
  ];

  constructor(private route: ActivatedRoute,
    private rest: RestService,
    private dateUtil: DateTimeUtilsService,
    ) {}

	ngOnInit(): void {
		const contractId = this.route.snapshot.paramMap.get("id");
		if (contractId && contractId !== "neu") {
			this.subscriptions.add(
				this.rest.fetchContractById(contractId).subscribe({
					next: (data) => {
            console.log("contract response", data);
            this.contract = data.data;
            this.contract.begin = this.dateUtil.ensureDate(this.contract.begin);
            this.contract.end = this.dateUtil.ensureDate(this.contract.end);
            this.initForm();
					},
					error: (err) => {
            console.error("Error while fetching contract with id " + contractId, err);
						this.error = true;
					},
				})
        );
      } else {
        this.isNew = true;
        this.initForm();
      }
	}

	private initForm() {
		this.beginControl = new FormControl(this.dateUtil.formatDate(this.contract?.begin || '', 'YYYY-MM-DD'), Validators.required);
		this.endControl = new FormControl(this.dateUtil.formatDate(this.contract?.end || '', 'YYYY-MM-DD'), Validators.required);
		this.supervisorControl = new FormControl(this.contract?.supervisor);
    if (this.contract?.timePerWeekday) {

      for (let timePerWeekday of this.contract?.timePerWeekday){
        this.timePerWeekdayArray.push(
          new FormGroup<{weekday: FormControl<EWeekday | null>, time: FormControl<number | null>}>(
            {
              weekday: new FormControl<EWeekday>(timePerWeekday.weekday),
              time: new FormControl<number>(timePerWeekday.time)
            }
          )
        );
      }
    }

    this.timePerWeekdayArray.setValidators([Validators.required]);
    this.form = new FormGroup(
      {
        begin: this.beginControl,
        end: this.endControl,
        supervisor: this.supervisorControl,
        timePerWeekday: this.timePerWeekdayArray
      }
    );
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

  formatDate(date: Date) {
    return this.dateUtil.formatDate(date);
  }

  createEmptyTimePerWeekdayItem(): FormGroup<{weekday: FormControl<EWeekday | null>, time: FormControl<number | null>}> {
    return new FormGroup({
      weekday: new FormControl<EWeekday | null>(null, [Validators.required]),
      time: new FormControl<number | null>(null, [Validators.required]),
    });
  }

  addTime(): void {
    this.timePerWeekdayArray.push(this.createEmptyTimePerWeekdayItem());
  }

  removeTime(index: number): void {
    this.timePerWeekdayArray.removeAt(index);
  }

  save(): void {
    this.form?.updateValueAndValidity();
    if(this.isNew){
      this.create();
    } else {
      this.update();
    }
  }

  private create() {
    this.rest.createContract(this.form?.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private update() {
    const data: ContractData = this.form?.value;
    data._id = this.contract!._id;
    this.rest.updateContract(data).subscribe({
      next: (response) => {
        console.log(response);
        if (response.success){
          this.form?.markAsPristine();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

type FormData = {
	name: string;
	control: FormControl;
};
