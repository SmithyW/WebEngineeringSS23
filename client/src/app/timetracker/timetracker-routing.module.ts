import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimetrackerComponent } from './timetracker.component';
import { NotFound404Component } from '../not-found404/not-found404.component';

const routes: Routes = [
  {
    path: 'timetracker',
    component: TimetrackerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
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
export class TimetrackerRoutingModule {}
