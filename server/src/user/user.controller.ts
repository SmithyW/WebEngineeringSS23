import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';
import { IBaseResponse } from '@shared/interfaces/responses/baseResponse.interface';
import { User } from '@shared/models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUserDto: CreateUserDto,
    @Res() response
    ): Promise<IBaseResponse<User | any>> {
      
        return this.userService.create(createUserDto).then((user: User) => {
          const res: IBaseResponse<User> = {
            success: true,
            message: 'User created',
            data: user
          };
          return response.status(HttpStatus.CREATED).json(res);
        }
      )
      .catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while creating the user',
          data: err
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      }
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Res() response): Promise<IBaseResponse<User[] | any>> {
    return this.userService.findAll().then((users: User[]) => {
      const res: IBaseResponse<User[]> = {
        success: true,
        message: 'Users found',
        data: users
      };
      return response.status(HttpStatus.OK).json(res);
    }
    ).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while finding the users',
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
    ): Promise<IBaseResponse<User | any>> {
      return this.userService.findOne(id).then((user: User) => {
        const res: IBaseResponse<User> = {
          success: true,
          message: 'User found',
          data: user
        };
        return response.status(HttpStatus.OK).json(res);
      }
      ).catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while finding the user',
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
    @Res() response,
    @Body() updateUserDto: UpdateUserDto
    ): Promise<IBaseResponse<User | any>> {
      return this.userService.update(id, updateUserDto).then((user: User) => {
        const res: IBaseResponse<User> = {
          success: true,
          message: 'User updated',
          data: user
        };
        return response.status(HttpStatus.OK).json(res);
      }
      ).catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while updating the user',
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
      return this.userService.remove(id).then((user: User) => {
        const res: IBaseResponse<any> = {
          success: true,
          message: 'User deleted',
          data: user
        };
        return response.status(HttpStatus.OK).json(res);
      }
      ).catch((err) => {
        const res: IBaseResponse<any> = {
          success: false,
          message: 'An error occured while deleting the user',
          data: err
        };
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
      }
    );
  }
}
