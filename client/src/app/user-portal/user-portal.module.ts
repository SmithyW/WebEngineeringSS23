import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPortalComponent } from './user-portal.component';
import { HomeComponent } from './home/home.component';
import { UserPortalRoutingModule } from './user-portal-routing.module';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DayRowComponent } from './timetracker/day-row/day-row.component';
import { DisabledDayRowComponent } from './timetracker/disabled-day-row/disabled-day-row.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserPortalComponent,
    HomeComponent,
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
