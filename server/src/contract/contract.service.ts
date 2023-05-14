import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract, ContractDocument } from '@shared/models/contract.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContractService {

  constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>) {}

  create(createContractDto: CreateContractDto): Promise<Contract> {
    const createdContract: ContractDocument = new this.contractModel(createContractDto);
    createdContract.setWeeklyTime();
    return createdContract.save();
  }

  findAll(filter: any): Promise<Contract[]> {
    return this.contractModel.find(filter)
      .populate('user')
      .populate('supervisor')
      .exec();
  }

  findOne(id: string): Promise<Contract> {
    return this.contractModel.findOne({ _id: id })
      .populate('user')
      .populate('supervisor')
      .exec();
  }

  update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    const updatedContract = new this.contractModel(updateContractDto);
    updatedContract.setWeeklyTime();
    return this.contractModel.findOneAndUpdate({ _id: id }, updatedContract, { new: true })
      .populate('user')
      .populate('supervisor')
      .exec();
  }

  remove(id: string): Promise<any> {
    return this.contractModel.deleteOne({ _id: id }).exec();
  }
}
