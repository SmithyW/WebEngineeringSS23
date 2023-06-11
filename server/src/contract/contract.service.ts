import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract, ContractDocument } from '@shared/models/contract.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ContractService {

  constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>) {}

  create(createContractDto: CreateContractDto): Promise<Contract> {
    const createdContract: ContractDocument = new this.contractModel(createContractDto);
    this.setWeeklyTime(createdContract);
    return createdContract.save();
  }

  findAll(filter: { user?: string, month?: number, year?: number }): Promise<Contract[]> {
    const mongoQueryFilter: any = {
      $and: []
    };
    if (filter.user) {
      mongoQueryFilter.$and.push({
        user: new Types.ObjectId(filter.user),
      });
    }

    if (filter.year) {
      // First day of the year
      let searchDateStart: Date = new Date(filter.year, 0);
      // Last day of the year
      let searchDateEnd: Date = new Date(filter.year, 11, 31);
      if (filter.month) {
        searchDateStart = new Date(filter.year, filter.month - 1, 1);
        searchDateEnd = new Date(filter.year, filter.month, 0);
      }

      mongoQueryFilter.$and.push({
        $and: [
          { begin: { $lte: searchDateEnd } },
          { end: { $gte: searchDateStart } },
        ],
      });
    }
    return this.contractModel.find(mongoQueryFilter)
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
    updatedContract._id = id;
    this.setWeeklyTime(updatedContract);
    return this.contractModel.findOneAndUpdate({ _id: id }, updatedContract, { new: true })
      .populate('user')
      .populate('supervisor')
      .exec();
  }

  remove(id: string): Promise<any> {
    return this.contractModel.deleteOne({ _id: id }).exec();
  }

  private setWeeklyTime(contract: Contract): void {
    const timePerWeekday = contract.timePerWeekday;
    let weeklyTime = 0;
    timePerWeekday.forEach((day) => {
      weeklyTime += day.time;
    });
    contract.weeklyTime = weeklyTime; 
  }
}
