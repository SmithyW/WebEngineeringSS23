import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SignedMonth,
  SignedMonthDocument,
} from '@shared/models/signed-month.model';
import { Model, ObjectId, Types } from 'mongoose';
import { SignedMonthDto } from './dto/sign-request.dto';

@Injectable()
export class SignedMonthService {
  constructor(
    @InjectModel(SignedMonth.name) private signedMonthModel: Model<SignedMonth>,
  ) {}

  getByMonthAndYear(
    month: number,
    year: number,
    user: string,
  ): Promise<SignedMonthDocument> {
    return this.signedMonthModel.findOne({
      month: month,
      year: year,
      user: user,
    });
  }

  findAll(
    filter: { user?: string; month?: number; year?: number },
    populate = true,
  ): Promise<SignedMonth[]> {
    const mongoQueryFilter: any = {
      $and: [],
    };
    if (filter.user) {
      mongoQueryFilter.$and.push({
        user: new Types.ObjectId(filter.user),
      });
    }

    if (filter.year) {
      let exprArr = { $and: [] };
      const exprYear = { $eq: [{ $year: '$start' }, filter.year] };
      exprArr.$and.push(exprYear);

      let exprMonth = null;

      if (filter.month) {
        exprMonth = { $eq: [{ $month: '$start' }, filter.month] };
        exprArr = exprMonth;
      }

      mongoQueryFilter.$and.push({
        $expr: exprArr,
      });
    }
    const mongoQuery = this.signedMonthModel.find(mongoQueryFilter);
    if (populate) {
      mongoQuery.populate('user');
    }
    return mongoQuery.exec();
  }

  create(signedMonth: SignedMonthDto): Promise<SignedMonth> {
    const createSignedMonthDoc: SignedMonthDocument = new this.signedMonthModel(
      signedMonth,
    );
    return createSignedMonthDoc.save();
  }
}
