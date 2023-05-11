import { Injectable } from '@nestjs/common';
import { IContract } from '@shared/models/contract.model';

@Injectable()
export class ContractService {
  create(contract: IContract) {

    return 'This action adds a new contract';
  }

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, contract: IContract) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
