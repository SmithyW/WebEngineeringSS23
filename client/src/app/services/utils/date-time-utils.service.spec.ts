/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { DateTimeUtilsService, Month } from './date-time-utils.service';

import * as DateUtils from '@wojtekmaj/date-utils';

describe('Service: DateTimeUtils', () => {
  let service: DateTimeUtilsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeUtilsService]
    });

    service = TestBed.inject(DateTimeUtilsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get JANURARY', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 0, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.JANUARY);
    jasmine.clock().uninstall();
  });

  it('should get FEBRUARY', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 1, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.FEBRUARY);
    jasmine.clock().uninstall();
  });

  it('should get MARCH', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 2, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.MARCH);
    jasmine.clock().uninstall();
  });

  it('should get APRIL', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 3, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.APRIL);
    jasmine.clock().uninstall();
  });

  it('should get MAY', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 4, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.MAY);
    jasmine.clock().uninstall();
  });

  it('should get JUNE', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 5, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.JUNE);
    jasmine.clock().uninstall();
  });

  it('should get JULY', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 6, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.JULY);
    jasmine.clock().uninstall();
  });

  it('should get AUGUST', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 7, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.AUGUST);
    jasmine.clock().uninstall();
  });

  it('should get SEPTEMBER', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 8, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.SEPTEMBER);
    jasmine.clock().uninstall();
  });

  it('should get OCTOBER', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 9, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.OCTOBER);
    jasmine.clock().uninstall();
  });

  it('should get NOVEMBER', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 10, 1));
    
    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.NOVEMBER);
    jasmine.clock().uninstall();
  });

  it('should get DECEMBER', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2023, 11, 1));

    let month = service.getCurrentMonth();

    expect(month).toEqual(Month.DECEMBER);
    jasmine.clock().uninstall();
  });

  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.JANUARY, 2023);
    
    console.log(days);

    expect(days.length).toEqual(31);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.FEBRUARY, 2023);
    
    expect(days.length).toEqual(28);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.MARCH, 2023);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.APRIL, 2023);
    
    expect(days.length).toEqual(30);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.MAY, 2023);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.JUNE, 2023);
    
    expect(days.length).toEqual(30);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.JULY, 2023);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.AUGUST, 2023);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.SEPTEMBER, 2023);
    
    expect(days.length).toEqual(30);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.OCTOBER, 2023);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.NOVEMBER, 2023);
    
    expect(days.length).toEqual(30);
  });
  it('should calc days of month', () => {
    const days = service.getDaysInMonth(Month.DECEMBER, 2023);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month leap year', () => {
    const days = service.getDaysInMonth(Month.JANUARY, 2024);
    
    expect(days.length).toEqual(31);
  });
  it('should calc days of month leap year', () => {
    const days = service.getDaysInMonth(Month.FEBRUARY, 2024);
    
    expect(days.length).toEqual(29);
  });
  it('should calc days of month leap year', () => {
    const days = service.getDaysInMonth(Month.MARCH, 2024);
    
    expect(days.length).toEqual(31);
  });

});
