import { Month } from '@shared/enums/month.enum';

export type Maybe<T> = T | undefined;

export type MonthYear = {
  month: Month;
  year: number;
};
