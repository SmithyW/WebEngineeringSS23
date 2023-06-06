import { WorkdayData } from '@shared/custom/types';
import { ContractData } from '@shared/custom/types';
import { MonthYear } from '@shared/custom/types';
import { Month } from '@shared/enums/month.enum';
import { Contract } from '@shared/models/contract.model';
import { Workday } from '@shared/models/workday.model';

export const REST_BASE_URL = 'http://localhost:3000';

export class REST_FETCH_WORKDAYS_URL {
  static readonly url = REST_BASE_URL + '/user/{id}/workdays';

  public static resolve(userid: string): string {
    return REST_FETCH_WORKDAYS_URL.url.replace('{id}', userid);
  }

  public static queryParams(month: Month, year: number): MonthYear {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_UPDATE_WORKDAY_URL {
  static readonly url = REST_BASE_URL + '/user/{userId}/workdays/{id}';

  public static resolve(userid: string, workday: WorkdayData): string {
    return REST_FETCH_WORKDAYS_URL.url
      .replace('{userId}', userid)
      .replace('{id}', workday._id.toString());
  }
}

export class REST_FETCH_CONTRACT_URL {
  static readonly url = REST_BASE_URL + '/user/{id}/contracts';

  public static resolve(userid: string): string {
    return REST_FETCH_CONTRACT_URL.url.replace('{id}', userid);
  }

  public static queryParams(month: Month, year: number): MonthYear {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_UPDATE_CONTRACT_URL {
  static readonly url = REST_BASE_URL + '/user/{userId}/contracts/{id}';

  public static resolve(userid: string, contract: ContractData): string {
    return REST_FETCH_CONTRACT_URL.url
      .replace('{userId}', userid)
      .replace('{id}', contract._id.toString());
  }

  public static queryParams(month: Month, year: number): MonthYear {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_FETCH_USER_URL {
  static readonly url = REST_BASE_URL + '/user/{id}';

  public static resolve(userid: string): string {
    return REST_FETCH_WORKDAYS_URL.url.replace('{id}', userid);
  }
}

export class REST_UPDATE_USER_URL {
  static readonly url = REST_BASE_URL + '/user/{id}';

  public static resolve(userid: string): string {
    return REST_FETCH_WORKDAYS_URL.url.replace('{id}', userid);
  }
}
