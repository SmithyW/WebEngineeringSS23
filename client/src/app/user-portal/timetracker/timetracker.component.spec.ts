import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetrackerComponent } from './timetracker.component';

describe('TimetrackerComponent', () => {
  let component: TimetrackerComponent;
  let fixture: ComponentFixture<TimetrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
