import { MonthYear } from '@shared/custom/types';
import { Month } from '@shared/enums/month.enum';

export const REST_BASE_URL = 'http://localhost:3000';

export class REST_WORKDAYS_URL {
  static readonly url = REST_BASE_URL + '/user/{id}/timetracking/workdays';

  public static resolve(userid: string): string {
    return REST_WORKDAYS_URL.url.replace('{id}', userid);
  }

  public static postData(month: Month, year: number): MonthYear {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_CONTRACT_URL {
  static readonly url = REST_BASE_URL + '/user/{id}/contracts';

  public static resolve(userid: string): string {
    return REST_CONTRACT_URL.url.replace('{id}', userid);
  }

  public static postData(month: Month, year: number): MonthYear {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_CONTRACTS_URL {
  static readonly url = REST_BASE_URL + '/user/{id}/contracts';

  public static resolve(userid: string): string {
    return REST_CONTRACTS_URL.url.replace('{id}', userid);
  }
}
