import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from '@shared/models/contract.model';
import { IBaseResponse } from '@shared/interfaces/responses/baseResponse.interface';

@Controller(['contracts', 'users/:userId/contracts'])
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createContractDto: CreateContractDto,
    @Res() response
    ): Promise<IBaseResponse<Contract | any>> {

      return this.contractService.create(createContractDto).then((contract: Contract) => {
        const res: IBaseResponse<Contract> = {
          success: true,
          message: 'Contract created',
          data: contract
        };
        return response.status(HttpStatus.CREATED).json(res);
      }
    )
    .catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while creating the contract',
        data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('userId') userId: string,
    @Res() response): Promise<IBaseResponse<Contract[] | any>> {
    let filter = {};
    if (userId) {
      filter = { user: userId };
    }
    return this.contractService.findAll(filter).then((contracts: Contract[]) => {
      const res: IBaseResponse<Contract[]> = {
        success: true,
        message: 'Contracts found',
        data: contracts
      };
      return response.status(HttpStatus.OK).json(res);
    }
    ).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while finding the contracts',
        data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  );
  }

  @Get(':contractId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('contractId') contractId: string, 
    @Res() response
    ): Promise<IBaseResponse<Contract | any>> {

    return this.contractService.findOne(contractId).then((contract: Contract) => {
      const res: IBaseResponse<Contract> = {
        success: true,
        message: 'Contract found',
        data: contract
      };
      return response.status(HttpStatus.OK).json(res);
    })
    .catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while finding the contract',
        data: err
      };
      return response.status(HttpStatus.NOT_FOUND).json(res);
    });
  }

  @Patch(':contractId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('contractId') contractId: string,
    @Res() response,
    @Body() updateContractDto: UpdateContractDto
    ): Promise<IBaseResponse<Contract | any>> {

    return this.contractService.update(contractId, updateContractDto).then((contract: Contract) => {
      const res: IBaseResponse<Contract> = {
        success: true,
        message: 'Contract updated',
        data: contract
      };
      return response.status(HttpStatus.OK).json(res);
    }
    ).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while updating the contract',
        data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
    );
  }

  @Delete(':contractId')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('contractId') contractId: string,
    @Res() response
    ): Promise<IBaseResponse<any>> {
    return this.contractService.remove(contractId).then(() => {
      
      const res: IBaseResponse<any> = {
        success: true,
        message: 'Contract deleted',
        data: null
        };
        return response.status(HttpStatus.OK).json(res);

    }).catch((err) => {
      const res: IBaseResponse<any> = {
        success: false,
        message: 'An error occured while deleting the contract',
        data: err
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
    );
  }
}
