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
import { FormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    UserPortalComponent,
    HomeComponent,
    NavComponent,
    TimetrackerComponent,
    ContractsComponent,
    AccountDetailsComponent
  ],
  imports: [
    CommonModule,
    UserPortalRoutingModule,
    MatToolbarModule,
    MatCommonModule,
    MatFormFieldModule,
    NgbModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
  ]
})
export class UserPortalModule { }
