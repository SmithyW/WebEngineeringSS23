import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContractData } from "@shared/custom/types";
import { Contract } from "@shared/models/contract.model";
import { Subscription } from "rxjs";
import { RestService } from "src/app/services/rest/rest.service";
import { DateTimeUtilsService } from "src/app/services/utils/date-time-utils.service";

@Component({
	selector: "app-contracts",
	templateUrl: "./contracts.component.html",
	styleUrls: ["./contracts.component.scss"],
})
export class ContractsComponent implements OnInit, OnDestroy {
	contracts: ContractData[] = [];

	private subscriptions = new Subscription();

	constructor(
		private rest: RestService,
		private dateUtils: DateTimeUtilsService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.rest.fetchContracts().subscribe({
				next: (response) => {
					console.log("contracts response", response);
					this.contracts = response.data;
				},
				error: (err) => {
					console.error("Error while fetching all contracts:", err);
				},
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	formatDate(date: Date | string): string {
		return this.dateUtils.formatDate(date);
	}

	addContract(): void {
		this.router.navigate(["neu"], { relativeTo: this.route });
	}

	openContract(contract: ContractData): void {
		this.router.navigate([contract._id], { relativeTo: this.route });
	}
}
