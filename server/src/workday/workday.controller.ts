import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { WorkdayService } from './workday.service';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { IBaseResponse } from '@shared/interfaces/responses/baseResponse.interface';
import { Workday } from '@shared/models/workday.model';

@Controller('workday')
export class WorkdayController {
  constructor(private readonly workdayService: WorkdayService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createWorkdayDto: CreateWorkdayDto,
    @Res() response
    ): Promise<IBaseResponse<Workday | any>> {
      return this.workdayService.create(createWorkdayDto).then((workday: Workday) => {
          const res: IBaseResponse<Workday> = {
            success: true,
            message: 'Workday created',
            data: workday
          };
          return response.status(HttpStatus.CREATED).json(res);
        }
      )
      .catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while creating the workday',
          data: err
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      }
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Res() response
  ): Promise<IBaseResponse<Workday[] | any>> {
    return this.workdayService.findAll().then((workdays: Workday[]) => {
      const res: IBaseResponse<Workday[]> = {
        success: true,
        message: 'Workdays found',
        data: workdays
      };
      return response.status(HttpStatus.OK).json(res);
    }
    ).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while finding the workdays',
        data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: string,
    @Res() response
    ): Promise<IBaseResponse<Workday | any>> {
      return this.workdayService.findOne(id).then((workday: Workday) => {
        const res: IBaseResponse<Workday> = {
          success: true,
          message: 'Workday found',
          data: workday
        };
        return response.status(HttpStatus.OK).json(res);
      }
      ).catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while finding the workday',
          data: err
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      }
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateWorkdayDto: UpdateWorkdayDto,
    @Res() response
    ): Promise<IBaseResponse<Workday | any>> {
      return this.workdayService.update(id, updateWorkdayDto).then((workday: Workday) => {
        const res: IBaseResponse<Workday> = {
          success: true,
          message: 'Workday updated',
          data: workday
        };
        return response.status(HttpStatus.OK).json(res);
      }
      ).catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while updating the workday',
          data: err
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      }
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id') id: string,
    @Res() response
    ): Promise<IBaseResponse<any>> {
      return this.workdayService.remove(id).then(() => {
        const res: IBaseResponse<any> = {
          success: true,
          message: 'Workday deleted',
          data: null
        };
        return response.status(HttpStatus.OK).json(res);
      }
      ).catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while deleting the workday',
          data: err
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      }
    );
  }
}
