import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { WorkdayService } from './workday.service';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { IBaseResponse } from '@shared/interfaces/responses/baseResponse.interface';
import { Workday } from '@shared/models/workday.model';

@Controller(['workdays', 'users/:userId/workdays'])
export class WorkdayController {
  constructor(private readonly workdayService: WorkdayService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('userId') userId: string,
    @Body() createWorkdayDto: CreateWorkdayDto,
    @Res() response,
  ): Promise<IBaseResponse<Workday | any>> {
    if (userId) {
      createWorkdayDto.user = userId;
    }
    return this.workdayService
      .create(createWorkdayDto)
      .then((workday: Workday) => {
        const res: IBaseResponse<Workday> = {
          success: true,
          message: 'Workday created',
          data: workday,
        };
        return response.status(HttpStatus.CREATED).json(res);
    })
    .catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while creating the workday',
          data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('userId') userId: string,
    @Query('month') month: number,
    @Query('year') year: number,
    @Res() response
  ): Promise<IBaseResponse<Workday[] | any>> {
    let filter: { user?: string, month?: number, year?: number } = {};
    if (userId) {
      filter = { user: userId };
    }
    if (month) {
      filter['month'] = month;
    }
    if (year) {
      filter['year'] = year;
    }

    return this.workdayService.findAll(filter).then((workdays: Workday[]) => {
      const res: IBaseResponse<Workday[]> = {
        success: true,
        message: 'Workdays found',
        data: workdays
    };
      return response.status(HttpStatus.OK).json(res);
    }).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while finding the workdays',
          data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    });
  }

  @Get(':workdayId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('workdayId') workdayId: string,
    @Res() response
  ): Promise<IBaseResponse<Workday | any>> {
    return this.workdayService.findOne(workdayId).then((workday: Workday) => {
      const res: IBaseResponse<Workday> = {
        success: true,
        message: 'Workday found',
        data: workday
      };
      return response.status(HttpStatus.OK).json(res);
    }).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while finding the workday',
          data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    });
  }

  @Put(':workdayId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('workdayId') workdayId: string,
    @Body() updateWorkdayDto: UpdateWorkdayDto,
    @Res() response
  ): Promise<IBaseResponse<Workday | any>> {
    return this.workdayService.update(workdayId, updateWorkdayDto).then((workday: Workday) => {
      const res: IBaseResponse<Workday> = {
        success: true,
        message: 'Workday updated',
        data: workday
      };
      return response.status(HttpStatus.OK).json(res);
    }).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while updating the workday',
          data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    });
  }

  @Post('/multiple')
  @HttpCode(HttpStatus.OK)
  updateMultiple(
    @Param('userId') userId: string,
    @Body() updateWorkdaysDto: UpdateWorkdayDto[],
    @Res() response
  ): Promise<IBaseResponse<Workday[] | any>> {
    // #TODO;
    return response.status(HttpStatus.OK).json({ message: "Not implemented yet" });
  }

  @Post('/sign')
  @HttpCode(HttpStatus.OK)
  signMonth(
    @Param('userId') userId: string,
    @Body() signRequestDto: any,
    @Res() response,
  ): Promise<IBaseResponse<any>> {
    if (!userId) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'No userId was provided' });
    }

    return this.workdayService.sign(signRequestDto.month, signRequestDto.year)
      .then((res: boolean) => {
        if (res) {
          return response.status(HttpStatus.OK).json({
            message: 'Signing was successful',
          });
        }
        return response.status(HttpStatus.OK).json({
          message: 'Signing was not successful',
        });
      })
      .catch(() => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error',
        });
      });
  }

  @Delete(':workdayId')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('workdayId') workdayId: string,
    @Res() response
  ): Promise<IBaseResponse<any>> {
    return this.workdayService.remove(workdayId).then(() => {
      const res: IBaseResponse<any> = {
        success: true,
        message: 'Workday deleted',
        data: null
      };
      return response.status(HttpStatus.OK).json(res);
    }).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while deleting the workday',
          data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    });
  }
}
