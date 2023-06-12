import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { IBaseResponse } from '@shared/interfaces/responses/baseResponse.interface';
import { SignedMonth } from '@shared/models/signed-month.model';
import { SignedMonthService } from './signed-month.service';

@Controller(['signed-months', 'users/:userId/signed-months'])
export class SignedMonthController {
  constructor(private readonly signedMonthService: SignedMonthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('userId') userId: string,
    @Query('month') month: string,
    @Query('year') year: string,
    @Res() response,
  ): Promise<IBaseResponse<SignedMonth[] | any>> {
    let filter: { user?: string; month?: number; year?: number } = {};
    if (userId) {
      filter = { user: userId };
    }
    if (month) {
      filter.month = Number(month);
    }
    if (year) {
      filter.year = Number(year);
    }
    return this.signedMonthService
      .findAll(filter)
      .then((months: SignedMonth[]) => {
        const res: IBaseResponse<SignedMonth[]> = {
          success: true,
          message: 'Signed months found',
          data: months,
        };
        return response.status(HttpStatus.OK).json(res);
      })
      .catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while finding signed months',
          data: err,
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      });
  }
}
