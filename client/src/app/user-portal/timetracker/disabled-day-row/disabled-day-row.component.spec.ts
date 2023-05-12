import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledDayRowComponent } from './disabled-day-row.component';

describe('DisabledDayRowComponent', () => {
  let component: DisabledDayRowComponent;
  let fixture: ComponentFixture<DisabledDayRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledDayRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledDayRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
