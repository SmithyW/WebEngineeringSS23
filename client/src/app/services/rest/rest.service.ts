import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workday } from '@shared/models/workday.model';
import { Observable } from 'rxjs';
import { Month } from '@shared/enums/month.enum';
import { Contract } from '@shared/models/contract.model';
import * as paths from '@shared/rest/rest-paths';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '@shared/models/user.model';
import { UserData } from '@shared/custom/types';
import { ContractData } from '@shared/custom/types';
import { WorkdayData } from '@shared/custom/types';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private static readonly REST_BASE_URL = "http://localhost:3000";

  constructor(
    private httpClient: HttpClient,
    private authServcie: AuthenticationService,
  ) { }

  public fetchWorkdays(month: Month, year: number): Observable<WorkdayData[]> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_FETCH_WORKDAYS_URL.resolve(user._id.toString());
    const queryParams = paths.REST_FETCH_WORKDAYS_URL.queryParams(month, year);
    return this.httpClient.get<WorkdayData[]>(url, {
      params: queryParams
    });
  }

  public updateWorkday(workday: WorkdayData): Observable<WorkdayData> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_UPDATE_WORKDAY_URL.resolve(user._id.toString(), workday);
    return this.httpClient.post<WorkdayData>(url, workday);
  }

  public fetchContract(month: Month, year: number): Observable<ContractData> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_FETCH_CONTRACT_URL.resolve(user._id.toString());
    const queryParams = paths.REST_FETCH_CONTRACT_URL.queryParams(month, year);
    return this.httpClient.get<ContractData>(url, {
      params: queryParams
    });
  }

  public updateContract(contract: ContractData): Observable<ContractData> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_UPDATE_CONTRACT_URL.resolve(user._id.toString(), contract);
    return this.httpClient.post<ContractData>(url, contract);
  }

  public fetchContracts(): Observable<ContractData[]> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_FETCH_CONTRACT_URL.resolve(user._id.toString());
    return this.httpClient.get<ContractData[]>(url);
  }

  public fetchUser(): Observable<UserData> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_FETCH_USER_URL.resolve(user._id.toString());
    return this.httpClient.get<UserData>(url);
  }

  public updateUser(userData: UserData): Observable<UserData> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_UPDATE_USER_URL.resolve(user._id.toString());
    return this.httpClient.post<UserData>(url, userData);
  }

}
