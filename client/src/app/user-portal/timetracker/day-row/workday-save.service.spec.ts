/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkdaySaveService } from './workday-save.service';

describe('Service: WorkdaySave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkdaySaveService]
    });
  });

  it('should ...', inject([WorkdaySaveService], (service: WorkdaySaveService) => {
    expect(service).toBeTruthy();
  }));
});
