import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkdayDto } from './dto/create-workday.dto';
import { UpdateWorkdayDto } from './dto/update-workday.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workday, WorkdayDocument } from '@shared/models/workday.model';
import { Model, Types } from 'mongoose';
import { SignedMonthDto } from '../signed-month/dto/sign-request.dto';
import { SignedMonthService } from 'src/signed-month/signed-month.service';
import { createHash } from 'crypto'; 

@Injectable()
export class WorkdayService {
  @Inject()
  private signedMonthService: SignedMonthService;

  constructor(
    @InjectModel(Workday.name) private workdayModel: Model<Workday>,
  ) {}

  create(createWorkdayDto: CreateWorkdayDto): Promise<Workday> {
    const createdWorkday: WorkdayDocument = new this.workdayModel(createWorkdayDto);
    return createdWorkday.save();
  }

  findAll(filter: { user?: string, month?: number, year?: number }, populate: boolean = true): Promise<Workday[]> {
    const mongoQueryFilter: any = {
      $and: []
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
    const mongoQuery = this.workdayModel.find(mongoQueryFilter);
    if (populate) {
      mongoQuery.populate('user');
    }
    return mongoQuery.exec();
  }

  findOne(id: string): Promise<Workday> {
    return this.workdayModel.findOne({ _id: id }).populate('user').exec();
  }

  async sign(user: string, month: number, year: number): Promise<{ success: boolean, message?: string, code?: number, error?: object }> {
    const today: Date = new Date(Date.now());
    const monthToSign: Date = new Date(year, month, 0);

    if (today <= monthToSign) {
      return new Promise((resolve) => {
        resolve({
          success: false,
          message: 'A active or future month cannot be signed',
        });
      });
    }

    const filter = {
      user: user,
      month: month,
      year: year,
    };

    let workdaysInMonth: Workday[];
    return this.findAll(filter, false).then((workdays: Workday[]) => {
      workdaysInMonth = this.orderWorkdays(workdays);

      if (!workdaysInMonth || workdaysInMonth.length == 0) {
        return {
          success: false,
          message: 'No entries to sign for provided month',
        }
      }

      const hashVal = createHash('sha256').update(JSON.stringify(workdaysInMonth)).digest('hex');
      const signedMonth: SignedMonthDto = new SignedMonthDto();
      signedMonth.year = year;
      signedMonth.month = month;
      signedMonth.user = user;
      signedMonth.objectHash = hashVal;
      return this.signedMonthService.create(signedMonth).then((res) => {
          if (res) {
            return {
              success: true,
              message: 'Month was successfully signed',
            };
          }
          return {
            success: false,
            message: 'Month could not be signed',
          }
      }).catch((error) => {
        let errMsg = 'Error signing the month';
        if (error.code === 11000) {
          errMsg = 'This month was already signed';
        }
        return {
          success: false,
          code: error.code,
          message: errMsg,
          error: error,
       }
      });
    });

  }

  update(id: string, updateWorkdayDto: UpdateWorkdayDto): Promise<Workday> {
    const updatedWorkday = new this.workdayModel(updateWorkdayDto);
    updatedWorkday._id = id;
    return this.workdayModel.findOneAndUpdate({ _id: id }, updatedWorkday, { new: true }).exec();
  }

  remove(id: string): Promise<any> {
    return this.workdayModel.deleteOne({ _id: id }).exec();
  }

  /*
    * Internal private functions
  * */

  private orderWorkdays(arr: Workday[]) {
    return arr.map((element: Workday) => this.sortObj<Workday>(element));
  }

  private sortObj<T>(obj: T): T {
    // Ugly stringify and parsing to eliminate wrapper properties
    const tempStr = JSON.stringify(obj);
    obj = JSON.parse(tempStr);
      return Object.keys(obj)
      .sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {} as T);
  }
}
