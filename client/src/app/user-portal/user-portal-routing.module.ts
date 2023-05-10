import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserPortalComponent } from './user-portal.component';
import { NotFound404Component } from '../not-found404/not-found404.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserPortalComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'home/zeiterfassung',
        component: TimetrackerComponent,
      },
      {
        path: 'home/vertragdetails',
        component: ContractsComponent,
      },
      {
        path: 'home/account',
        component: AccountDetailsComponent,
      },
    ],
  },

  // 404 Not Found
  { path: '**', component: NotFound404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPortalRoutingModule {}