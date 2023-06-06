import { IWorkdayTime } from "@shared/interfaces/workdayTime.interface";

export class CreateContractDto {
    begin: Date;
    end: Date;
    timePerWeekday: [IWorkdayTime];
    supervisor?: string;
    user?: string;
}
