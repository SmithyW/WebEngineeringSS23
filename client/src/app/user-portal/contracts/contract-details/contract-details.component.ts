import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Route, ParamMap } from "@angular/router";
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
  weeklyWorkingtimeControl: FormControl = new FormControl();
	error = false;
  form: FormArray | undefined;
  isNew = false;

	private subscriptions = new Subscription();

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
            this.contract = data;
					},
					error: (err) => {
						console.error("Error while fetching contract with id " + contractId, err);
						this.error = true;
						this.contract = {
							_id: "weu89r7cn23",
							begin: new Date(2022, 9, 1),
							end: new Date(2023, 0, 31),
							timePerWeekday: [],
							user: "0",
							weeklyTime: 5,
						};
					},
				})
			);
		} else {
      this.isNew = true;
    }
		this.initForm();
	}

	private initForm() {
		this.beginControl = new FormControl(this.contract?.begin, Validators.required);
		this.endControl = new FormControl(this.contract?.end, Validators.required);
		this.supervisorControl = new FormControl(this.contract?.supervisor);
		this.weeklyWorkingtimeControl = new FormControl(this.contract?.weeklyTime, Validators.required);
    this.form = new FormArray([this.beginControl, this.endControl, this.supervisorControl, this.weeklyWorkingtimeControl]);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

  formatDate(date: Date) {
    return this.dateUtil.formatDate(date);
  }

  save(): void {
    console.warn("TODO: save contract");
    this.form?.updateValueAndValidity();
    if(this.isNew){
      this.create();
    } else {
      this.update();
    }
  }

  private create() {

  }

  private update() {

  }
}

type FormData = {
	name: string;
	control: FormControl;
};
