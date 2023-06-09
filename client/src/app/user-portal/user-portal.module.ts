import { NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { ContractsComponent } from './contracts/contracts.component';
import { NavComponent } from './nav/nav.component';
import { DayRowComponent } from './timetracker/day-row/day-row.component';
import { DisabledDayRowComponent } from './timetracker/disabled-day-row/disabled-day-row.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { UserPortalRoutingModule } from './user-portal-routing.module';
import { UserPortalComponent } from './user-portal.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserPortalComponent,
    NavComponent,
    TimetrackerComponent,
    ContractsComponent,
    AccountDetailsComponent,
    DayRowComponent,
    DisabledDayRowComponent,
    ContractDetailsComponent,
  ],
  imports: [
    CommonModule,
    UserPortalRoutingModule,
    MatToolbarModule,
    MatCommonModule,
    MatFormFieldModule,
    MatIconModule,
    NgbModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserPortalModule { }
