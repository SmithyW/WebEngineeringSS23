import { Month } from '@shared/enums/month.enum';

export const REST_BASE_URL = 'http://localhost:3000';

export class REST_WORKDAYS_URL {
  readonly url = REST_BASE_URL + '/user/{id}/timetracking/workdays';

  public resolve(userid: string): string {
    return this.url.replace('{id}', userid);
  }

  public postData(month: Month, year: number): any {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_CONTRACT_URL {
  readonly url = REST_BASE_URL + '/user/{id}/contracts';

  public resolve(userid: string): string {
    return this.url.replace('{id}', userid);
  }

  public postData(month: Month, year: number): any {
    return {
      month: month,
      year: year,
    };
  }
}

export class REST_CONTRACTS_URL {
  readonly url = REST_BASE_URL + '/user/{id}/contracts';

  public resolve(userid: string): string {
    return this.url.replace('{id}', userid);
  }
}
