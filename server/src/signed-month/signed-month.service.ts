import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  SignedMonth,
  SignedMonthDocument,
} from "@shared/models/signed-month.model";
import { Model } from "mongoose";
import { SignedMonthDto } from "./dto/sign-request.dto";

@Injectable()
export class SignedMonthService {
  constructor(
    @InjectModel(SignedMonth.name) private signedMonthModel: Model<SignedMonth>,
  ) {}

  getByMonthAndYear(month: number, year: number): Promise<SignedMonthDocument> {
    return this.signedMonthModel.findOne({ month: month, year: year });
  }

  create(signedMonth: SignedMonthDto): Promise<SignedMonth> {
    const createSignedMonthDoc: SignedMonthDocument = new this.signedMonthModel(
      signedMonth,
    );
    return createSignedMonthDoc.save();
  }
}
