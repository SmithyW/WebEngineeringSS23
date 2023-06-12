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

  findAll(filter: { user?: string; month?: number; year?: number },
  ): Promise<SignedMonth[]> {
    return this.signedMonthModel.find(filter).populate('user');
  }

  create(signedMonth: SignedMonthDto): Promise<SignedMonth> {
    const createSignedMonthDoc: SignedMonthDocument = new this.signedMonthModel(
      signedMonth,
    );
    return createSignedMonthDoc.save();
  }
}
