export class SignRequestDto {
  year: number;
  month: number;
}

export class SignedMonthDto {
  year: number;
  month: number;
  user: string;
  objectHash: string;
}
