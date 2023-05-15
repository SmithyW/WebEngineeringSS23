import { Month } from '@shared/enums/month.enum';
import { Contract } from '@shared/models/contract.model';
import { User } from '@shared/models/user.model';
import { Workday } from '@shared/models/workday.model';

// Utility types
/**
 * Make every attribute optional
 */
export type Maybe<T> = T | undefined;

/**
 * Exclude functions from class type
 */
export type ExcludeFuntions<C> = Pick<
  C,
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [Key in keyof C]: C[Key] extends Function ? never : Key;
  }[keyof C]
>;

// Data types
export type MonthYear = {
  month: Month;
  year: number;
};

export type ContractData = ExcludeFuntions<Contract>;
export type UserData = ExcludeFuntions<User>;
export type WorkdayData = ExcludeFuntions<Workday>;
