import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkdaySaveService {

  private stream = new Subject<any>();

  public getSaveSubject(): Subject<any> {
    return this.stream;
  }

  public publish(value: any) {
    this.stream.next(value);
  }

  public trigger() {
    this.stream.next(null);
  }

}
