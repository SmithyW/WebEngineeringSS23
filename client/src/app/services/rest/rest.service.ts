import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Month } from "@shared/enums/month.enum";
import { RestResponse } from "@shared/custom/responses";
import * as paths from "@shared/rest/rest-paths";
import { AuthenticationService } from "../authentication/authentication.service";
import { UserData } from "@shared/custom/types";
import { ContractData } from "@shared/custom/types";
import { WorkdayData } from "@shared/custom/types";

@Injectable({
	providedIn: "root",
})
export class RestService {
	private static readonly REST_BASE_URL = "http://localhost:3000";

	constructor(private httpClient: HttpClient, private authServcie: AuthenticationService) {}

	public fetchWorkdays(month: Month, year: number): Observable<RestResponse<WorkdayData[]>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_FETCH_WORKDAYS_URL.resolve(user._id.toString());
		const queryParams = paths.REST_FETCH_WORKDAYS_URL.queryParams(month, year);
		const options = {
			params: queryParams,
		};
		console.info("GET", url, options);
		return this.httpClient.get<RestResponse<WorkdayData[]>>(url, options);
	}

	public updateWorkday(workday: Partial<WorkdayData>): Observable<RestResponse<WorkdayData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_UPDATE_WORKDAY_URL.resolve(user._id.toString(), workday);
		console.info("PUT", url, workday);
		return this.httpClient.put<RestResponse<WorkdayData>>(url, workday);
	}

	public createWorkday(workday: Partial<WorkdayData>): Observable<RestResponse<WorkdayData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}
		workday.user = user._id.toString();

		const url = paths.REST_CREATE_WORKDAY_URL.resolve(user._id.toString());
		console.info("POST", url, workday);
		return this.httpClient.post<RestResponse<WorkdayData>>(url, workday);
	}

	public fetchContract(month: Month, year: number): Observable<RestResponse<ContractData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_FETCH_CONTRACT_URL.resolve(user._id.toString());
		const queryParams = paths.REST_FETCH_CONTRACT_URL.queryParams(month, year);
		const options = {
			params: queryParams,
		};
		console.info("GET", url, options);
		return this.httpClient.get<RestResponse<ContractData>>(url, options);
	}

	public fetchContractById(contractId: string): Observable<RestResponse<ContractData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}
		const url = paths.REST_FETCH_CONTRACT_BY_ID_URL.resolve(user._id.toString(), contractId);
		console.info("GET", url);
		return this.httpClient.get<RestResponse<ContractData>>(url);
	}

	public updateContract(contract: ContractData): Observable<RestResponse<ContractData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_UPDATE_CONTRACT_URL.resolve(user._id.toString(), contract);
		console.info("PUT", url, contract);
		return this.httpClient.put<RestResponse<ContractData>>(url, contract);
	}

	public createContract(contract: ContractData): Observable<RestResponse<ContractData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}
		const url = paths.REST_CREATE_CONTRACT_URL.resolve(user._id.toString());
		console.info("POST", url, contract);
		return this.httpClient.post<RestResponse<ContractData>>(url, contract);
	}

	public fetchContracts(): Observable<RestResponse<ContractData[]>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_FETCH_CONTRACT_URL.resolve(user._id.toString());
		console.info("GET", url);
		return this.httpClient.get<RestResponse<ContractData[]>>(url);
	}

	public fetchUser(): Observable<RestResponse<UserData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_FETCH_USER_URL.resolve(user._id.toString());
		console.info("GET", url);
		return this.httpClient.get<RestResponse<UserData>>(url);
	}

	public updateUser(userData: UserData): Observable<RestResponse<UserData>> {
		const user = this.authServcie.getUser();
		if (!user?._id) {
			throw new Error("A user must be logged in!");
		}

		const url = paths.REST_UPDATE_USER_URL.resolve(user._id.toString());
		console.info("PUT", url, userData);
		return this.httpClient.put<RestResponse<UserData>>(url, userData);
	}
}
