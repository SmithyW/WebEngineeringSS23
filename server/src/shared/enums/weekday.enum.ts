/**
 * Weekday to Number (1 to 7)
 */
export enum EWeekday {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

export const EWeekdayLabelMapping: Record<EWeekday, string> = {
  [EWeekday.MONDAY]: 'Montag',
  [EWeekday.TUESDAY]: 'Dienstag',
  [EWeekday.WEDNESDAY]: 'Mittwoch',
  [EWeekday.THURSDAY]: 'Donnerstag',
  [EWeekday.FRIDAY]: 'Freitag',
  [EWeekday.SATURDAY]: 'Samstag',
  [EWeekday.SUNDAY]: 'Sonntag',
};

