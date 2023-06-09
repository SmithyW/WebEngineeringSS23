import { ContractData, MonthYear, WorkdayData } from '@shared/custom/types';
import { Month } from '@shared/enums/month.enum';

export const REST_BASE_URL = 'http://localhost:3000';

export class REST_FETCH_WORKDAYS_URL {
  static readonly url = REST_BASE_URL + '/users/{id}/workdays';

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
  static readonly url = REST_BASE_URL + '/users/{userId}/workdays/{id}';

  public static resolve(userid: string, workday: Partial<WorkdayData>): string {
    if (!workday._id) {
      throw new Error('missing workday._id');
    }
    return REST_FETCH_WORKDAYS_URL.url
      .replace('{userId}', userid)
      .replace('{id}', workday._id.toString());
  }
}

export class REST_CREATE_WORKDAY_URL {
  static readonly url = REST_BASE_URL + '/users/{userId}/workdays';

  public static resolve(userid: string): string {
    return REST_FETCH_WORKDAYS_URL.url.replace('{userId}', userid);
  }
}

export class REST_FETCH_CONTRACT_URL {
  static readonly url = REST_BASE_URL + '/users/{id}/contracts';

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

export class REST_FETCH_CONTRACT_BY_ID_URL {
  static readonly url = REST_BASE_URL + '/users/{userId}/contracts/{id}';

  public static resolve(userid: string, contractId: string): string {
    return REST_FETCH_CONTRACT_URL.url
      .replace('{userId}', userid)
      .replace('{id}', contractId);
  }
}

export class REST_UPDATE_CONTRACT_URL {
  static readonly url = REST_BASE_URL + '/users/{userId}/contracts/{id}';

  public static resolve(userid: string, contract: ContractData): string {
    return REST_FETCH_CONTRACT_URL.url
      .replace('{userId}', userid)
      .replace('{id}', contract._id.toString());
  }
}

export class REST_CREATE_CONTRACT_URL {
  static readonly url = REST_BASE_URL + '/users/{userId}/contracts';

  public static resolve(userid: string): string {
    return REST_CREATE_CONTRACT_URL.url.replace('{userId}', userid);
  }
}

export class REST_FETCH_USER_URL {
  static readonly url = REST_BASE_URL + '/users/{id}';

  public static resolve(userid: string): string {
    return REST_FETCH_WORKDAYS_URL.url.replace('{id}', userid);
  }
}

export class REST_UPDATE_USER_URL {
  static readonly url = REST_BASE_URL + '/users/{id}';

  public static resolve(userid: string): string {
    return REST_FETCH_WORKDAYS_URL.url.replace('{id}', userid);
  }
}
