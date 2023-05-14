import { OmitType } from "@nestjs/mapped-types";
import { Workday } from "@shared/models/workday.model";

export class CreateWorkdayDto extends OmitType(Workday, ['user'] as const) {
    user?: string;
}