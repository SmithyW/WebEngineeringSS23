import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workday } from '@shared/models/workday.model';
import { Observable } from 'rxjs';
import { Month } from '@shared/enums/month.enum';
import { Contract } from '@shared/models/contract.model';
import * as paths from '@shared/rest/rest-paths';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private static readonly REST_BASE_URL = "http://localhost:3000";
  private static readonly REST_WORKDAYS_URL = RestService.REST_BASE_URL + "/user/{id}/timetracking/{month}";
  private static readonly REST_CONTRACT_URL = RestService.REST_BASE_URL + "/user/{id}/contracts/{month}";

  constructor(
    private httpClient: HttpClient,
    private authServcie: AuthenticationService,
  ) { }

  public fetchWorkdays(month: Month, year: number): Observable<Workday[]> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_FETCH_WORKDAYS_URL.resolve(user._id.toString());
    const postData = paths.REST_FETCH_WORKDAYS_URL.postData(month, year);
    return this.httpClient.post<Workday[]>(url, postData);
  }

  public fetchContract(month: Month, year: number): Observable<Contract> {
    const user = this.authServcie.getUser();
    if (!user?._id){
      throw new Error('A user must be logged in!');
    }

    const url = paths.REST_FETCH_CONTRACT_URL.resolve(user._id.toString());
    const postData = paths.REST_FETCH_CONTRACT_URL.postData(month, year);
    return this.httpClient.post<Contract>(url, postData);
  }

}
