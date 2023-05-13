import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workday } from '@shared/models/workday.model';
import { Observable } from 'rxjs';
import { Month } from '@shared/enums/month.enum';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private static readonly REST_BASE_URL = "http://localhost:3000";
  private static readonly REST_WORKDAYS_URL = RestService.REST_BASE_URL + "/user/{id}/timetracking/{month}";

  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchWorkdays(month: Month): Observable<Workday[]> {
    const url = RestService.REST_WORKDAYS_URL.replace("{id}", "U.123").replace("{month}", "MAY");
    return this.httpClient.get<Workday[]>(url);
  }
}
